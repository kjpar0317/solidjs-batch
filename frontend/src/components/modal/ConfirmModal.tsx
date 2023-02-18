import type { JSXElement } from "solid-js";
import { createSignal, createEffect } from "solid-js";

interface ModalProps {
  open: boolean;
  children: JSXElement;
  onOk: () => void;
  onClose: () => void;
}

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

  return (
    <div
      classList={{
        modal: true,
        "modal-open": props.open,
        "!visible": isVisible(),
      }}
    >
      <div class="card w-96 glass bg-base-100">
        <div class="card-body">
          <h2 class="card-title pt-2 pl-5">Notice</h2>
          <div class="max-h-[600px] min-h-[80px] border-t-2 pt-2 pl-2 border-base-300 border-b-gray-700 overflow-y-auto justify-center flex items-center">
            {props.children}
          </div>
          <div class="card-actions justify-between mb-2 pl-3 pr-3">
            <button
              class="btn btn-primary btn-outline"
              onClick={() => props.onOk()}
            >
              Ok
            </button>
            <button
              class="btn btn-primary btn-outline"
              onClick={() => props.onClose()}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
