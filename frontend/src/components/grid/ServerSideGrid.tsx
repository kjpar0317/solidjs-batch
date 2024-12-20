import type { JSXElement, Accessor } from "solid-js";
import type { GridReadyEvent, CellClickedEvent, IGetRowsParams, GridApi, ColDef, GridSizeChangedEvent, IDatasource, PaginationChangedEvent } from "ag-grid-community";
import type { TContext, FilterModelItem } from "typings/aggrid";

import { createSignal, createEffect, createMemo, on, onCleanup } from "solid-js";
import AgGridSolid from "solid-ag-grid";
import { createScheduled, throttle, type Scheduled } from "@solid-primitives/scheduled";

import LoadingSkeletonColumn from "~/components/grid/LoadingSkeletonColumn";

interface ServerSideGridProps {
  components?: TContext;
  columnDefs: ColDef[];
  defaultColDef: ColDef;
  rowHeight?: number;
  suppressPaginationPanel?: boolean;
  suppressMultiSort?: boolean;
  suppressHorizontalScroll?: boolean; // aggrid 얘네들이 horizontal 영역 계산안하고 autopaging함.. aggrid-community는 무료라 아직도 수정 계획없음.
  quickFilterModel?: FilterModelItem;
  skeleton?: boolean;
  onMutate: (params: IGetRowsParams) => void;
  onGridReady?: (event: GridReadyEvent) => void;
  onGridClick?: (event: CellClickedEvent) => void;
  onPageChanged?: (page: number, totPage: number) => void;
}

export default function ServerSideGrid(props: ServerSideGridProps): JSXElement {
  const { suppressHorizontalScroll = true, rowHeight = 46 } = props;
  const [gridApi, setGridApi] = createSignal<GridApi>();
  const [quickFilterModel, setQuickFilterModel] = createSignal<any>(props.quickFilterModel);
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
        return { ...props.components, LoadingSkeletonColumn: LoadingSkeletonColumn };
      } else {
        return { LoadingSkeletonColumn: LoadingSkeletonColumn };
      }
    } else {
      return props.components;
    }
  });
  const defColDef: Accessor<ColDef> = createMemo((): ColDef => {
    if (props.skeleton) {
      return { ...props.defaultColDef, cellRenderer: LoadingSkeletonColumn };
    } else {
      return props.defaultColDef;
    }
  });
  const cacheBlockSize: Accessor<number> = createMemo((): number => (inHeight() > 0 && calcPageSize(inHeight())) || 0);

  createEffect(
    on(inHeight, (next: number, prev: number | undefined): void => {
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
    // gridApi()?.destroy();
  });

  function updateGridData(): void {
    const dataSource: IDatasource = {
      rowCount: undefined,
      getRows: (params: IGetRowsParams) => {
        setTimeout(() => {
          // take a slice of the total rows
          if (quickFilterModel()) {
            params = { ...params, filterModel: quickFilterModel() };
          }

          props.onMutate(params);
        }, 0);
      }
    };

    gridApi()?.setGridOption('datasource', dataSource);
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
    props.onPageChanged && props.onPageChanged(event.api.paginationGetCurrentPage(), event.api.paginationGetTotalPages());

    if (event.api.paginationGetCurrentPage() > 0) {
      gridApi()?.setGridOption('cacheBlockSize', cacheBlockSize());
    }
    gridApi()?.hideOverlay();
  }
  function handleGridSizeChanged(event: GridSizeChangedEvent): void {
    const pageSize: number = calcPageSize(event.clientHeight);
    setInHeight(event.clientHeight);

    gridApi()?.setGridOption('cacheBlockSize', cacheBlockSize());
    gridApi()?.setGridOption('paginationPageSize', pageSize);

    throttleGridSizeFit();
  }
  // function setPageSizeChange(api: IGridApi): void {
  //   if (props.offsetHeight) {
  //     const pageSize: number = calcPageSize(props.offsetHeight);
  //     api.paginationSetPageSize(pageSize);
  //     setCahceBlockSize(pageSize);
  //   }
  // }
  function calcPageSize(clientHeight: number): number {
    // console.log(`clientHeight : ${clientHeight}, rowHeight: ${rowHeight}`);
    // const gridHeight: number = clientHeight - rowHeight - ((props.suppressPaginationPanel && 17) || rowHeight);
    const gridHeight: number = props.suppressPaginationPanel ? clientHeight - rowHeight : clientHeight - rowHeight - 48;
    // console.log(`gridHeight : ${gridHeight}`);
    // console.log(gridHeight / rowHeight);
    const rowNum: number = Math.trunc(gridHeight / rowHeight);
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
      // cacheBlockSize={cacheBlockSize()}
      infiniteInitialRowCount={props.skeleton ? cacheBlockSize() : 1}
      maxConcurrentDatasourceRequests={1}
      suppressPaginationPanel={props.suppressPaginationPanel}
      suppressMultiSort={props.suppressMultiSort}
      multiSortKey="ctrl"
      paginationAutoPageSize
      suppressHorizontalScroll={suppressHorizontalScroll}
      onGridReady={handleGridReady}
      onCellClicked={handleGridClick}
      onPaginationChanged={handleGridPageChanged}
      onGridSizeChanged={handleGridSizeChanged}
    />
  );
}
