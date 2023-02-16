import type { JSXElement } from "solid-js";
import { A } from "solid-start";
import Counter from "~/components/Counter";
import DefaultTheme from "~/components/themes/DefaultTheme";

export default function About(): JSXElement {
  return (
    <DefaultTheme>
      <div class="m-4">
        <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
          About Page
        </h1>
        <Counter />
        <p class="mt-8">
          Visit{" "}
          <a
            href="https://solidjs.com"
            target="_blank"
            class="text-sky-600 hover:underline"
          >
            solidjs.com
          </a>{" "}
          to learn how to build Solid apps.
        </p>
        <p class="my-4">
          <A href="/" class="text-sky-600 hover:underline">
            Home
          </A>
          {" - "}
          <span>About Page</span>
        </p>
      </div>
    </DefaultTheme>
  );
}
