import { A } from "solid-start";
import Counter from "~/components/Counter";
import DefaultTheme from "~/components/themes/DefaultTheme";

export default function Home() {
  return (
    <DefaultTheme>
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
        Hello world!
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
        <span>Home</span>
        {" - "}
        <A href="/about" class="text-sky-600 hover:underline">
          About Page
        </A>{" "}
      </p>
      <p class="my-4">
        <span>Home</span>
        {" - "}
        <A href="/login" class="text-sky-600 hover:underline">
          Login Page
        </A>{" "}
      </p>      
    </DefaultTheme>
  );
}
