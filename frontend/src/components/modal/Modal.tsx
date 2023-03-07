import type { JSXElement } from "solid-js";
import { createSignal, createEffect, Show } from "solid-js";

import { clickOutside, useOutSideClick } from "~/directives/clickOutside";

interface ModalProps {
  title?: string;
  open: boolean;
  hideActions?: boolean;
  children: JSXElement;
  onClose?: () => void;
}

useOutSideClick(clickOutside);

export default function Modal(props: ModalProps): JSXElement {
  const [isVisible, setVisibility] = createSignal(props.open);

  createEffect(() => {
    if (props.open) {
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

  return (
    <div
      class="modal"
      classList={{
        modal: true,
        "modal-open": props.open,
        "!visible": isVisible(),
      }}
      use:clickOutside={() => handleClose()}
    >
      <div class="modal-box min-w-[300px] max-w-auto">
        <div class="card glass bg-base-100 text-base-content">
          <div class="card-body">
            <div class="justify-between">
              <div class="flex float-left">
                <h2 class="card-title pt-2 pl-5">{props.title}</h2>
              </div>
              <div class="flex float-right">
                <button
                  class="btn btn-outline btn-square btn-sm"
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
            <div class="max-h-[600px] border-t-2 pt-2 pl-2 border-base-300 border-b-gray-700 overflow-y-auto">
              {props.children}
            </div>
            <Show when={!props.hideActions}>
              <div class="card-actions justify-end mb-2 pr-2">
                <button
                  class="btn btn-primary btn-outline"
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
            </Show>
          </div>
        </div>
      </div>
    </div>
  );
}
