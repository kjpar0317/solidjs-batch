import type { JSXElement } from "solid-js";
import { createSignal, createEffect, onCleanup } from "solid-js";
import AgGridSolid from "ag-grid-solid";

import type { GridReadyEvent, CellClickedEvent, GridSizeChangedEvent, PaginationChangedEvent, IGetRowsParams, IGridApi } from "typings/aggrid";

interface ServerSideGridProps {
  components?: any;
  columnDefs: any;
  defaultColDef: any;
  rowHeight?: number;
  itemPerPage?: number;
  suppressPaginationPanel?: boolean;
  suppressMultiSort?: boolean;
  quickFilterModel?: any;
  onMutate: (params: IGetRowsParams) => void;
  onGridReady?: (event: GridReadyEvent) => void;
  onGridClick?: (event: CellClickedEvent) => void;
  onPageChanged?: (page: number, totPage: number) => void;
}

export default function ServerSideGrid(props: ServerSideGridProps): JSXElement {
  const { itemPerPage = 10 } = props;
  const [gridApi, setGridApi] = createSignal<IGridApi>();
  const [pageSize, setPageSize] = createSignal<number>(itemPerPage);
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

    const updateData = () => {
      const dataSource = {
        getRows: function (params: IGetRowsParams) {
          if (quickFilterModel()) {
            params = { ...params, filterModel: quickFilterModel() };
          }

          gridApi()?.showLoadingOverlay();

          setTimeout(() => {
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
    setTimeout(function () {
      gridApi()?.sizeColumnsToFit();
    });
  }
  function handleGridPageChanged(event: PaginationChangedEvent) {
    props.onPageChanged && props.onPageChanged(event.api.paginationGetCurrentPage(), event.api.paginationGetTotalPages());
    gridApi()?.hideOverlay();
  }

  return (
    <AgGridSolid
      rowModelType="infinite"
      components={props.components}
      columnDefs={props.columnDefs}
      defaultColDef={props.defaultColDef}
      animateRows
      pagination
      rowHeight={props.rowHeight}
      headerHeight={props.rowHeight}
      paginationPageSize={pageSize()}
      cacheBlockSize={pageSize()}
      suppressPaginationPanel={props.suppressPaginationPanel}
      suppressMultiSort={props.suppressMultiSort}
      multiSortKey="ctrl"
      paginationAutoPageSize
      onGridReady={handleGridReady}
      onCellClicked={handleGridClick}
      onPaginationChanged={handleGridPageChanged}
    />
  );
}
