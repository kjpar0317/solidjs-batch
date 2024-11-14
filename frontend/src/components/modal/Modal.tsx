import type { JSXElement } from "solid-js";
import { createSignal, createEffect, Show } from "solid-js";

import { useOutSideClick, clickOutside } from "~/directives/clickOutside";

useOutSideClick(clickOutside);

interface ModalProps {
  title?: string;
  open: boolean;
  children: JSXElement;
  dismissActionArea?: boolean;
  onSave?: () => void;
  onClose?: () => void;
}

export default function Modal(props: Readonly<ModalProps>): JSXElement {
  const { title, open = false, dismissActionArea = false } = props;
  const [isVisible, setVisibility] = createSignal<boolean>(props.open);

  createEffect(() => {
    if (open) {
      setVisibility(true);
    } else {
      setTimeout(function () {
        setVisibility(false);
      }, 200);
    }
  });

  function handleClose() {
    props.onClose && props.onClose();
  }
  function handleSave() {
    props.onSave && props.onSave();
  }

  return (
    <div
      classList={{
        modal: true,
        "modal-open": props.open,
        "!visible": isVisible(),
      }}
    >
      <div
        class="modal-box-custom w-11/12 max-w-5xl"
        use:clickOutside={() => handleClose()}
      >
        <Show when={title}>
          <div class="fixed w-[calc(100%_-_15px)] h-12 pt-2 text-center bg-neutral justify-between shadow overflow-hidden sm:rounded-md font-bold text-2xl text-neutral-content ">
            <div class="flex pl-5 float-left">{title}</div>
            <div class="flex float-right pr-3 z-20">
              <button
                class="btn btn-outline bg-neutral border-2 border-white text-white btn-square btn-sm "
                onClick={handleClose}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </Show>

        <div class="pt-16 pl-5 pr-5 pb-5 w-full overflow-y-auto">
          {props.children}
        </div>

        <Show when={!dismissActionArea}>
          <div class="w-full items-center justify-between p-5 bg-base-100 border-t border-base-200 rounded-bl-lg rounded-br-lg">
            <div class="flex float-left"></div>
            <div class="flex float-right">
              <Show when={props.onSave}>
                <button class="px-4 py-2 btn btn-primary" onClick={handleSave}>
                  Save
                </button>
              </Show>
              <button
                class="btn bg-base-100 hover:bg-base-300 border-base-300 text-base-content"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        </Show>
      </div>
    </div>
  );
}
