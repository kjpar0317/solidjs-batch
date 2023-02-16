import type { JSXElement } from "solid-js";
import { createSignal, createEffect } from "solid-js";

interface ModalProps {
  open: boolean;
  children: JSXElement;
  onClose?: () => void;
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

  function handleClose() {
    props.onClose && props.onClose();
  }

  return (
    <div
      classList={{
        modal: true,
        "modal-open": props.open,
        "!visible": isVisible(),
      }}
    >
      <div class="modal-box min-w-[300px] p-20 max-w-auto">
        <div class="w-full">{props.children}</div>
        <div>
          <button class="btn btn-primary" onClick={handleClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
