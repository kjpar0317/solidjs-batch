import { createSignal, JSXElement } from "solid-js";
import AgGridSolid from "ag-grid-solid";

import ConfirmModal from "~/components/modal/ConfirmModal";

export function BatchManage(): JSXElement {
  const [open, setOpen] = createSignal<boolean>(false);

  const columnDefs = [
    { field: "make" },
    { field: "model" },
    { field: "price" },
  ];

  const rowData = [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxster", price: 72000 },
  ];

  const defaultColDef = {
    flex: 1,
    filter: true,
    sortable: true,
  };

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
          columnDefs={columnDefs}
          rowData={rowData}
          defaultColDef={defaultColDef}
          pagination
        />
      </div>
      <ConfirmModal
        open={open()}
        onOk={() => setOpen(false)}
        onClose={() => setOpen(false)}
      >
        정말 지우시겠습니까?
      </ConfirmModal>
    </div>
  );
}
