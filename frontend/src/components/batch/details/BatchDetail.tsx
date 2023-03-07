import type { JSXElement } from "solid-js";
import { createEffect, on } from "solid-js";
import { createForm } from "@felte/solid";
import reporter from "@felte/reporter-tippy";
import { validator } from "@felte/validator-yup";
import * as yup from "yup";
import { forEach } from "lodash";

import { INIT_JOB_INFO } from "~/constants";

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

export default function BatchDetail(props: any): JSXElement {
  const { form, setFields, reset } = createForm({
    initialValues: INIT_JOB_INFO,
    onSubmit: (values: any) => {
      console.log(values);
    },
    extend: [validator({ schema }), reporter()], // OR `extend: [validator({ schema })],`
  });

  createEffect(
    on(
      props,
      (info: any) => {
        if (info && info?.jobId) {
          forEach(info, (value, key) => {
            console.log(key);
            console.log(value);
            setFields(key, value, true);
          });
        } else {
          console.log("reset");
          reset();
        }
      },
      { defer: true }
    )
  );

  return (
    <div class="w-11/12">
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
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John"
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
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Doe"
              required
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
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="john.doe@company.com"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">
          전송
        </button>
      </form>
    </div>
  );
}
