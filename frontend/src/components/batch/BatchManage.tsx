import type { JSXElement } from "solid-js";
import { createSignal, createMemo } from "solid-js";
import AgGridSolid from "ag-grid-solid";

import { useStore } from "~/store";
import Modal from "~/components/modal/Modal";
import BatchDetail from "./details/BatchDetail";

export function BatchManage(): JSXElement {
  const [store] = useStore();
  const [open, setOpen] = createSignal<boolean>(false);
  const [gridApi, setGridApi] = createSignal<any>(null);
  const [rowData, setRowData] = createSignal<JobInfo | null>(null);

  const columnDefs = createMemo(() => [
    { field: "jobId", headerName: "배치ID" },
    { field: "jobName", headerName: "배치명" },
    { field: "jobStats", headerName: "상태" },
    { field: "jobCronExpression", headerName: "Cron Expression" },
    { field: "errorSkipYn", headerName: "스킵여부" },
    { field: "useYn", headerName: "사용여부" },
  ]);

  const batchList = createMemo(
    () => (gridApi() && store.batch.batchList()) || []
  );

  const defaultColDef = createMemo(() => ({
    flex: 1,
    filter: true,
    sortable: true,
  }));

  function handleGridReady(params: any) {
    setGridApi(params.api);
  }
  function handleGridClick(event: any) {
    setOpen(true);
    console.log(event);
    setRowData(event.data);
  }
  function handleModalClose() {
    setOpen(false);
    setRowData(null);
  }

  return (
    <div class="w-full h-full pt-6 pl-5 pr-4">
      <div class="text-sm breadcrumbs">
        <ul>
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>배치 관리</a>
          </li>
        </ul>
      </div>
      <div class="text-right">
        <button class="btn" onClick={() => setOpen(true)}>
          테스트
        </button>
      </div>
      <div class="ag-theme-alpine w-full h-[calc(100vh_-_270px)] pt-2">
        <AgGridSolid
          animateRows
          columnDefs={columnDefs()}
          rowData={batchList()}
          defaultColDef={defaultColDef()}
          pagination
          onGridReady={handleGridReady}
          onCellClicked={handleGridClick}
        />
      </div>
      <Modal
        title="배치 상세"
        open={open()}
        onClose={handleModalClose}
        hideActions
      >
        <BatchDetail {...rowData} />
      </Modal>
    </div>
  );
}
