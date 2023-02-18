import type { JSXElement } from "solid-js";

function Loading(): JSXElement {
  return (
    <div class="flex items-center justify-center min-h-screen">
      <div
        style="border-top-color:transparent"
        class="w-8 h-8 border-4 border-blue-200 rounded-full animate-spin"
      ></div>
      <p class="ml-2">로딩중...</p>
    </div>
  );
}

export { Loading };
