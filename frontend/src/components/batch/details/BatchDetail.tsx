import type { JSXElement } from "solid-js";
import { createSignal, createEffect, onMount, on } from "solid-js";
import { createForm } from "@felte/solid";
import reporter from "@felte/reporter-tippy";
import { validator } from "@felte/validator-yup";
import * as yup from "yup";
import { forEach } from "lodash";
import { createCodeMirror } from "solid-codemirror";
import { keymap } from "@codemirror/view";
import { indentWithTab } from "@codemirror/commands";
import { json } from "@codemirror/lang-json";

import { INIT_JOB_INFO } from "~/constants";
import { useStore } from "~/store";

yup.setLocale({
  mixed: {
    default: "Not valid",
    required: "Must not be empty",
  },
});

const schema = yup.object({
  jobId: yup.string().required(),
  jobName: yup.string().required(),
  jobCronExpression: yup.string().required(),
});

interface BatchDetailProps extends JobInfo {
  onChange?: () => void;
}
export default function BatchDetail(props: BatchDetailProps): JSXElement {
  const [_, { saveBatch, deleteBatch }] = useStore();
  const [cloneProps] = createSignal<BatchDetailProps>(props);
  const [jsonTxt, setJsonTxt] = createSignal<string>("");
  const { form, setFields, reset, setTouched } = createForm({
    initialValues: INIT_JOB_INFO,
    onSubmit: async (values: any) => {
      values.jsonParams = jsonTxt();

      await saveBatch(values);

      props.onChange && props.onChange();
    },
    extend: [validator({ schema }), reporter()], // OR `extend: [validator({ schema })],`
  });
  const { ref: editorRef, createExtension } = createCodeMirror({
    // The initial value of the editor
    value: jsonTxt(),
    // Fired whenever the editor code value changes.
    onValueChange: (value) => setJsonTxt(value),
    // Fired whenever a change occurs to the document. There is a certain difference with `onChange`.
    // onModelViewUpdate: (modelView) =>
    //   console.log("modelView updated", modelView),
  });

  // Toggle extension
  // createExtension(() => (showLineNumber() ? lineNumbers() : []));
  //
  // createEditorControlledValue(EditorView, jsonTxt());

  createExtension(() => [keymap.of([indentWithTab])]);
  createExtension(() => json());

  createEffect(() => {
    if (cloneProps() && cloneProps().jobId) {
      const { jobParams, onChange, ...rest } = cloneProps();
      forEach(rest, (value, key) => {
        // setTouched(key, false);
        setFields(key, value, true);
      });
    } else {
      console.log("reset");
      reset();
      setJsonTxt("");
    }
  });

  async function handleDelete() {
    await deleteBatch(props);
    props.onChange && props.onChange();
  }

  return (
    // <div class="md:min-w-[400px] w-screen md:w-3/4 lg:min-w-[1000px] h-[650px] mr-2">
    <div class="w-full">
      <form ref={form}>
        <div class="grid gap-6 mb-6 lg:grid-cols-2">
          <div>
            <label
              for="jobId"
              class="block mb-2 text-sm font-medium text-base-content"
            >
              배치ID
            </label>
            <input
              type="text"
              id="jobId"
              name="jobId"
              class="input input-md input-bordered input-primary"
              placeholder="배치ID"
              required
            />
          </div>
          <div>
            <label
              for="jobName"
              class="block mb-2 text-sm font-medium text-base-content"
            >
              배치명
            </label>
            <input
              type="text"
              id="jobName"
              name="jobName"
              class="input input-md input-bordered input-primary"
              placeholder="배치명"
              required
            />
          </div>
          <div>
            <label
              for="errorSkipYn"
              class="block mb-2 text-sm font-medium text-base-content"
            >
              오류 스킵 여부
            </label>
            Y :{" "}
            <input
              type="radio"
              name="errorSkipYn"
              class="radio radio-primary radio-md"
              value="Y"
              checked={props.errorSkipYn === "Y"}
            />
            {"   "}N :{" "}
            <input
              type="radio"
              name="errorSkipYn"
              class="radio radio-primary radio-md"
              value="N"
              checked={props.errorSkipYn === "N"}
            />
          </div>
          <div>
            <label
              for="useYn"
              class="block mb-2 text-sm font-medium text-base-content"
            >
              사용여부
            </label>
            Y :{" "}
            <input
              type="radio"
              name="useYn"
              class="radio radio-primary radio-md"
              value="Y"
              checked={props.useYn === "Y"}
            />
            {"   "}N :{" "}
            <input
              type="radio"
              name="useYn"
              class="radio radio-primary radio-md"
              value="N"
              checked={props.useYn === "N"}
            />
          </div>
        </div>
        <div class="mb-6">
          <label
            for="jobCronExpression"
            class="block mb-2 text-sm font-medium text-base-content"
          >
            Cron Expression
          </label>
          <input
            type="text"
            id="jobCronExpression"
            name="jobCronExpression"
            class="input input-md input-bordered input-primary w-11/12"
            placeholder="5 * * * * *"
            required
          />
        </div>
        <div class="mb-6">
          <label
            for="jobDesc"
            class="block mb-2 text-sm font-medium text-base-content"
          >
            배치 설명
          </label>
          <input
            type="text"
            id="jobDesc"
            name="jobDesc"
            class="input input-md input-bordered input-primary w-11/12"
            placeholder=""
            required
          />
        </div>
        <div class="mb-6">
          <label
            for="jobParams"
            class="block mb-2 text-sm font-medium text-base-content"
          >
            Job 파라메터
          </label>
          <div
            ref={editorRef}
            id="jobParams"
            class="input input-md input-bordered input-primary h-[150px] w-11/12"
          />
        </div>
        <div class="justify-between">
          <div class="text-left"></div>
          <div class="text-right space-x-1">
            <button type="submit" class="btn btn-primary">
              전송
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              onClick={handleDelete}
            >
              삭제
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
