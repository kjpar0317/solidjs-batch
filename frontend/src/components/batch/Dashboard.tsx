import type { JSXElement } from "solid-js";
import { createSignal } from "solid-js";
import { GridStack } from "solid-gridstack";

import { useStore } from "~/store";
import { ARR_GRID_LAYOUTS } from "~/constants";
import { getTextColorByTheme } from "~/utils/comm-utils";
import Modal from "~/components/modal/Modal";

export function Dashboard(): JSXElement {
  const [store] = useStore();
  const [open, setOpen] = createSignal<boolean>(false);

  function handleWidgetClick() {
    setOpen(true);
  }

  return (
    <div class="w-full h-full pt-4 pl-2 pr-2">
      <GridStack
        div={{ style: { margin: "2.5px" } }}
        items={ARR_GRID_LAYOUTS.map((m, i) => (
          <div
            gs-x={m.x}
            gs-y={m.y}
            gs-w={m.w}
            gs-h={m.h}
            gs-auto-position="m.auto_position"
          >
            <div
              class="bg-base-100"
              style={{
                margin: "2.5px",
                height: "calc(100% - 5px)",
                width: "calc(100% - 5px)",
                color: getTextColorByTheme(store.layouts.theme()),
                "border-radius": "7.5px",
              }}
            >
              <div class="w-full h-full p-2">
                <span>{m.title}</span>
                <div>
                  afdasfd
                  <button class="btn btn-primary" onClick={handleWidgetClick}>
                    테스트
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      />
      <Modal title="테스트" open={open()} onClose={() => setOpen(false)}>
        <div class="h-[1200px]">테스트</div>
      </Modal>
    </div>
  );
}
