import type { JSXElement } from "solid-js";
import { Switch, Match, lazy } from "solid-js";

import { BarChart } from "../charts";
import WidgetTitle from "./WidgetTitle";

interface DefaultWidgetProps {
  title?: string;
  module?: string;
  hidden?: boolean;
  onOpenModal?: () => void;
  onRemoveModal?: () => void;
}

export default function DefaultWidget(props: DefaultWidgetProps): JSXElement {
  return (
    <div class="flex flex-col w-full h-full p-4 shadow-lg card rounded-xl bg-base-10">
      <WidgetTitle
        title={props.title}
        module={props.module}
        hidden={props.hidden}
        onOpenModal={props.onOpenModal}
        onRemoveModal={props.onRemoveModal}
      />
      <Switch>
        <Match when={props.module == "barDataLabel"}>
          <div class="h-full mt-2">
            <BarChart />
          </div>
        </Match>
        <Match when={props.module == "candle"}>
          <div class="h-full mt-2"></div>
        </Match>
        <Match when={props.module == "radial"}>
          <div class="h-full mt-2"></div>
        </Match>
        <Match when={props.module == "treemap"}>
          <div class="h-full mt-2"></div>
        </Match>
        <Match when={props.module == "board"}>
          <div class="h-full mt-2"></div>
        </Match>
        <Match when={true}>
          <div class="h-full mt-2"></div>
        </Match>
      </Switch>
    </div>
  );
}
