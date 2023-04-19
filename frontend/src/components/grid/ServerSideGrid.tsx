import type { JSXElement } from "solid-js";
import { createSignal, createEffect, onCleanup } from "solid-js";
import AgGridSolid from "ag-grid-solid";
import { debounce } from "lodash";

import type { GridReadyEvent, CellClickedEvent, PaginationChangedEvent, IGetRowsParams, IGridApi } from "typings/aggrid";
import { GridSizeChangedEvent } from "ag-grid-community";

interface ServerSideGridProps {
  components?: any;
  columnDefs: any;
  defaultColDef: any;
  rowHeight?: number;
  itemPerPage?: number; // autoHeight계산인 경우 필요없음, 아닌 경우 필수
  offsetHeight?: number; // autoHeight 계산인 경우만 필요, 앞에 div ref의 offsetHeight를 넣어야 함
  suppressPaginationPanel?: boolean;
  suppressMultiSort?: boolean;
  quickFilterModel?: any;
  onMutate: (params: IGetRowsParams) => void;
  onGridReady?: (event: GridReadyEvent) => void;
  onGridClick?: (event: CellClickedEvent) => void;
  onPageChanged?: (page: number, totPage: number) => void;
}

export default function ServerSideGrid(props: ServerSideGridProps): JSXElement {
  const { rowHeight = 48 } = props;
  const [gridApi, setGridApi] = createSignal<IGridApi>();
  const [pageSize, setPageSize] = createSignal<number>((props.itemPerPage && props.itemPerPage) || 0);
  const [quickFilterModel, setQuickFilterModel] = createSignal<any>(props.quickFilterModel);

  createEffect(() => {
    if (props.quickFilterModel) {
      gridApi()?.purgeInfiniteCache();
      setQuickFilterModel(props.quickFilterModel);
    }
  });

  onCleanup(() => {
    // gridApi()?.destroy();
    window.removeEventListener("resize", handleSizeColumnToFit);
  });

  function handleGridReady(event: GridReadyEvent) {
    setGridApi(event.api);
    setPageSizeChange(event.api);

    const updateData = () => {
      const dataSource = {
        getRows: function (params: IGetRowsParams) {
          gridApi()?.showLoadingOverlay();

          setTimeout(() => {
            if (quickFilterModel()) {
              params = { ...params, filterModel: quickFilterModel() };
            }

            props.onMutate(params);
          }, 200);
        },
      };

      gridApi()?.setDatasource(dataSource);
    };
    updateData();

    event.api.sizeColumnsToFit();

    window.addEventListener("resize", handleSizeColumnToFit);

    props.onGridReady && props.onGridReady(event);
  }
  function handleGridClick(event: CellClickedEvent) {
    props.onGridClick && props.onGridClick(event);
  }
  function handleSizeColumnToFit() {
    debounce(() => {
      gridApi()?.purgeInfiniteCache();
      gridApi()?.sizeColumnsToFit();
    }, 500);
  }
  function handleGridPageChanged(event: PaginationChangedEvent) {
    props.onPageChanged && props.onPageChanged(event.api.paginationGetCurrentPage(), event.api.paginationGetTotalPages());
    gridApi()?.hideOverlay();
  }
  function handleGridSizeChanged(event: GridSizeChangedEvent) {
    const pageSize = calcPageSize(event.clientHeight);
    gridApi()?.paginationSetPageSize(pageSize);
    setPageSize(pageSize);
  }
  function setPageSizeChange(api: IGridApi) {
    if (props.offsetHeight) {
      const pageSize = calcPageSize(props.offsetHeight);
      api.paginationSetPageSize(pageSize);
      setPageSize(pageSize);
    }
  }
  function calcPageSize(clientHeight: number) {
    // console.log(clientHeight);
    const gridHeight = clientHeight - rowHeight - ((props.suppressPaginationPanel && 17) || rowHeight);
    // console.log(gridHeight);
    // console.log(gridHeight / rowHeight);
    const rowNum = Math.round(gridHeight / rowHeight) - 1;
    // console.log(rowNum);
    return rowNum;
  }

  return (
    <AgGridSolid
      rowModelType="infinite"
      components={props.components}
      columnDefs={props.columnDefs}
      defaultColDef={props.defaultColDef}
      animateRows
      pagination
      rowHeight={rowHeight}
      headerHeight={rowHeight}
      cacheBlockSize={pageSize()}
      // maxBlocksInCache={1}
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
