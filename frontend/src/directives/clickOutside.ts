// import type { Signal, Accessor, Setter } from 'solid-js';
import { onCleanup } from "solid-js";

// type KeyboardEvent = {
//   target: HTMLInputElement,
//   key: string,
// };
type MouseEvent = {
  target: HTMLButtonElement,
  key: string,
};

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      clickOutside?: () => void;
    }
  }
}

export function clickOutside(el: HTMLElement, accessor: () => Function) {
  const onClick: any = (e: MouseEvent) => !el.contains(e.target) && accessor()?.();

  document.body.addEventListener("click", onClick);

  onCleanup(() => document.body.removeEventListener("click", onClick));
}

export const useOutSideClick = (fn: (el: HTMLElement, accessor: () => Function) => void) => {};