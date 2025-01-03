import type { JSXElement } from "solid-js";
import { createSignal, createMemo, onMount } from "solid-js";
import AgGridSolid from "solid-ag-grid";

import type { IGridApi } from "typings/aggrid";
import { useStore } from "~/store";
import Modal from "~/components/modal/Modal";
import BatchDetail from "./details/BatchDetail";

export function BatchManage(): JSXElement {
  const [store, { batchRefetch, setInitBatch }] = useStore();
  const [open, setOpen] = createSignal<boolean>(false);
  const [gridApi, setGridApi] = createSignal<IGridApi>();
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

  onMount(() => {
    setInitBatch(true);
  });

  function handleGridReady(params: any) {
    setGridApi(params.api);
  }
  function handleGridClick(event: any) {
    setOpen(true);
    setRowData(event.data);
  }
  function handleModalClose() {
    setOpen(false);
    setRowData(null);
  }
  function handleDetailChange() {
    setOpen(false);
    setTimeout(() => {
      batchRefetch();
    }, 500);
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
        dismissActionArea
      >
        <BatchDetail {...rowData} onChange={handleDetailChange} />
      </Modal>
    </div>
  );
}
