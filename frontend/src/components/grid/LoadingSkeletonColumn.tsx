import { type JSXElement, Match, Switch } from "solid-js";
import { ICellRendererParams } from "ag-grid-community";

export default function LoadingSkeletonColumn(
  props: Readonly<ICellRendererParams>
): JSXElement {
  return (
    <Switch>
      <Match when={props.data}>{props.value}</Match>
      <Match when={!props.data}>
        <div class="w-full animate-pulse">
          <p class="h-2 w-auto mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
        </div>
      </Match>
    </Switch>
  );
}
