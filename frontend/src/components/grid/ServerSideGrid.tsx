import type { JSXElement } from "solid-js";
import { createSignal, onCleanup } from "solid-js";
import AgGridSolid from "ag-grid-solid";

interface ServerSideGridProps {
  components?: any;
  columnDefs: any;
  defaultColDef: any;
  rowHeight?: number | undefined;
  suppressPaginationPanel?: boolean;
  onMutate: (params: any) => void;
  onGridReady?: (event: any) => void;
  onGridClick?: (event: any) => void;
  onPageChanged?: (page: number, totPage: number) => void;
}

export default function ServerSideGrid(props: ServerSideGridProps): JSXElement {
  const [gridApi, setGridApi] = createSignal<any>();

  onCleanup(() => {
    // gridApi()?.destroy();
    window.removeEventListener('resize', handleSizeColumnToFit);
  });

  function handleGridReady(event: any) {
    setGridApi(event.api);

    const updateData = () => {
      const dataSource = {
        getRows: function (params: any) {
          console.log(params);
          gridApi().showLoadingOverlay();
          props.onMutate(params);
        },
      };
      gridApi().setDatasource(dataSource);
    };
    updateData();

    event.api.sizeColumnsToFit();

    window.addEventListener('resize', handleSizeColumnToFit);

    props.onGridReady && props.onGridReady(event);
  }
  function handleGridClick(event: any) {
    props.onGridClick && props.onGridClick(event);
  }
  function handleSizeColumnToFit() {
    setTimeout(function () {
      gridApi()?.sizeColumnsToFit();
    });
  }
  function handleGridSizeChanged() {
    handleSizeColumnToFit();
  }
  function handleGridPageChanged(event: any) {
    props.onPageChanged && props.onPageChanged(event.api.paginationGetCurrentPage(), event.api.paginationGetTotalPages());
  }

  return (
    <AgGridSolid
      rowModelType="infinite"
      components={props.components}
      columnDefs={props.columnDefs}
      defaultColDef={props.defaultColDef}
      pagination
      rowHeight={props.rowHeight}
      headerHeight={props.rowHeight}
      suppressPaginationPanel={props.suppressPaginationPanel}
      paginationAutoPageSize
      onGridReady={handleGridReady}
      onCellClicked={handleGridClick}
      onGridSizeChanged={handleGridSizeChanged}
      onPaginationChanged={handleGridPageChanged}
    />
  );
}
