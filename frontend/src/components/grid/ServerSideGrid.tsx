import type { JSXElement, Accessor } from "solid-js";
import type { GridSizeChangedEvent } from "ag-grid-community";
import {
  createSignal,
  createEffect,
  createMemo,
  on,
  onCleanup,
} from "solid-js";
import AgGridSolid from "ag-grid-solid";
import {
  createScheduled,
  throttle,
  type Scheduled,
} from "@solid-primitives/scheduled";

import type {
  GridReadyEvent,
  CellClickedEvent,
  PaginationChangedEvent,
  IGetRowsParams,
  IGridApi,
  IColDef,
  TContext,
  FilterModelItem,
} from "typings/aggrid";
import LoadingSkeletonColumn from "~/components/grid/LoadingSkeletonColumn";

interface ServerSideGridProps {
  components?: TContext;
  columnDefs: IColDef[];
  defaultColDef: IColDef;
  rowHeight?: number;
  suppressPaginationPanel?: boolean;
  suppressMultiSort?: boolean;
  quickFilterModel?: FilterModelItem;
  skeleton?: boolean;
  onMutate: (params: IGetRowsParams) => void;
  onGridReady?: (event: GridReadyEvent) => void;
  onGridClick?: (event: CellClickedEvent) => void;
  onPageChanged?: (page: number, totPage: number) => void;
}

export default function ServerSideGrid(
  props: Readonly<ServerSideGridProps>
): JSXElement {
  const { rowHeight = 46 } = props;
  const [gridApi, setGridApi] = createSignal<IGridApi>();
  const [quickFilterModel, setQuickFilterModel] = createSignal<any>(
    props.quickFilterModel
  );
  const [inHeight, setInHeight] = createSignal<number>(0);
  const throttleGridSizeFit: Accessor<boolean> = createScheduled(
    (): Scheduled<[]> =>
      throttle((): void | undefined => {
        updateGridData();
        gridApi()?.sizeColumnsToFit();
      }, 500)
  );
  const defComponents: Accessor<any> = createMemo((): any => {
    if (props.skeleton) {
      if (props.components) {
        return {
          ...props.components,
          LoadingSkeletonColumn: LoadingSkeletonColumn,
        };
      } else {
        return { LoadingSkeletonColumn: LoadingSkeletonColumn };
      }
    } else {
      return props.components;
    }
  });
  const defColDef: Accessor<IColDef> = createMemo((): IColDef => {
    if (props.skeleton) {
      return { ...props.defaultColDef, cellRenderer: LoadingSkeletonColumn };
    } else {
      return props.defaultColDef;
    }
  });
  const cacheBlockSize = createMemo(() => calcPageSize(inHeight()));

  createEffect(
    on(inHeight, (next: number, prev: number | undefined) => {
      if (prev && prev !== next) {
        throttleGridSizeFit();
      }
    })
  );
  createEffect((): void => {
    if (props.quickFilterModel) {
      gridApi()?.purgeInfiniteCache();
      setQuickFilterModel(props.quickFilterModel);
    }
  });

  onCleanup((): void => {
    gridApi()?.destroy();
  });

  function updateGridData(): void {
    const dataSource = {
      getRows: function (params: IGetRowsParams): void {
        gridApi()?.showLoadingOverlay();

        setTimeout((): void => {
          if (quickFilterModel()) {
            params = { ...params, filterModel: quickFilterModel() };
          }

          props.onMutate(params);
        }, 0);
      },
    };

    // TODO: deprecated 됨
    // gridApi()?.setDatasource(dataSource);
  }

  function handleGridReady(event: GridReadyEvent): void {
    setGridApi(event.api);
    // setPageSizeChange(event.api);

    updateGridData();

    event.api.sizeColumnsToFit();

    props.onGridReady && props.onGridReady(event);
  }
  function handleGridClick(event: CellClickedEvent): void {
    props.onGridClick && props.onGridClick(event);
  }
  function handleGridPageChanged(event: PaginationChangedEvent): void {
    props.onPageChanged &&
      props.onPageChanged(
        event.api.paginationGetCurrentPage(),
        event.api.paginationGetTotalPages()
      );
    gridApi()?.hideOverlay();
  }
  function handleGridSizeChanged(event: GridSizeChangedEvent): void {
    const pageSize: number = calcPageSize(event.clientHeight);
    setInHeight(event.clientHeight);
    gridApi()?.paginationSetPageSize(pageSize);
  }
  // function setPageSizeChange(api: IGridApi): void {
  //   if (props.offsetHeight) {
  //     const pageSize: number = calcPageSize(props.offsetHeight);
  //     api.paginationSetPageSize(pageSize);
  //     setCahceBlockSize(pageSize);
  //   }
  // }
  function calcPageSize(clientHeight: number): number {
    // console.log(clientHeight);
    const gridHeight: number =
      clientHeight -
      rowHeight -
      ((props.suppressPaginationPanel && 17) || rowHeight);
    // console.log(gridHeight);
    // console.log(gridHeight / rowHeight);
    const rowNum: number = Math.round(gridHeight / rowHeight) - 1;
    // console.log(rowNum);
    return rowNum;
  }

  return (
    <AgGridSolid
      rowModelType="infinite"
      components={defComponents()}
      columnDefs={props.columnDefs}
      defaultColDef={defColDef()}
      animateRows
      pagination
      rowHeight={rowHeight}
      headerHeight={rowHeight}
      cacheBlockSize={cacheBlockSize()}
      infiniteInitialRowCount={props.skeleton ? cacheBlockSize() : 1}
      maxConcurrentDatasourceRequests={1}
      suppressPaginationPanel={props.suppressPaginationPanel}
      suppressMultiSort={props.suppressMultiSort}
      multiSortKey="ctrl"
      paginationAutoPageSize
      onGridReady={handleGridReady}
      onCellClicked={handleGridClick}
      onPaginationChanged={handleGridPageChanged}
      onGridSizeChanged={handleGridSizeChanged}
    />
  );
}
