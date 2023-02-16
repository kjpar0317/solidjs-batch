import type { JSXElement } from "solid-js";
import { GridStack } from "solid-gridstack";

import { useStore } from "~/store";
import { ARR_GRID_LAYOUTS } from "~/constants";
import { getTextColorByTheme } from "~/utils/comm-utils";

export function Dashboard(): JSXElement {
  const [store] = useStore();

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
                <div>afdasfd</div>
              </div>
            </div>
          </div>
        ))}
      />
    </div>
  );
}
