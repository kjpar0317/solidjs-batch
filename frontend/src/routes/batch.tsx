import type { JSXElement } from "solid-js";
import DefaultTheme from "~/components/themes/DefaultTheme";
import { BatchManage } from "~/components/batch";

export default function batch(): JSXElement {
  return (
    <DefaultTheme>
      <BatchManage />
    </DefaultTheme>
  );
}
