import type { JSXElement } from "solid-js";
import { createSignal, createEffect } from "solid-js";
import { GridStack } from "solid-gridstack";

import { useStore } from "~/store";
import { ARR_GRID_LAYOUTS } from "~/constants";
import { getTextColorByTheme } from "~/utils/comm-utils";
import Modal from "~/components/modal/Modal";
import DefaultWidget from "~/components/widgets/DefaultWidget";

export function Dashboard(): JSXElement {
  const [store] = useStore();
  const [open, setOpen] = createSignal<boolean>(false);
  let gridRef: any;
  const options = {
    acceptWidgets: true,
    float: true,
    cellHeight: 120,
    resizable: { handles: "e, se, s, sw, w" },
  };

  createEffect(() => {
    console.log(gridRef);
  });

  function handleWidgetClick() {
    setOpen(true);
  }

  return (
    <div class="w-full h-full pt-4 pl-2 pr-2">
      <GridStack
        ref={gridRef}
        div={{ style: { margin: "2.5px" } }}
        options={options}
        items={ARR_GRID_LAYOUTS.map((m, i) => (
          <div
            gs-x={m.x}
            gs-y={m.y}
            gs-w={m.w}
            gs-h={m.h}
            gs-auto-position={m.auto_position}
          >
            <div class="grid-stack-item h-full w-full">
              <div
                class="bg-base-100 grid-stack-item-content"
                style={{
                  margin: "2.5px",
                  height: "calc(100% - 5px)",
                  width: "calc(100% - 5px)",
                  color: getTextColorByTheme(store.layout.theme()),
                  "border-radius": "7.5px",
                }}
              >
                <DefaultWidget title={m.title} module={m.module} />
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
