import { For } from "solid-js";
import { useLocation, A } from "@solidjs/router";

import { useStore } from "~/store";

const ARR_SIDEBAR = [
  {
    title: "Dashboard",
    path: "/",
    svgPath: () => (
      <>
        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
      </>
    ),
    hint: null,
  },
  {
    title: "배치 관리",
    path: "/about",
    svgPath: () => (
      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
    ),
    hint: "Pro",
  },
];

function Sidebar() {
  const location = useLocation();
  const [store] = useStore();

  // function handleLinkClick() {
  //   setSidebar(false);
  // }

  return (
    <div class="h-0 drawer">
      <aside
        id="sidebar"
        class={
          store.layouts.sidebar()
            ? "fixed top-0 left-0 z-20 h-[calc(100vh_-_70px)] w-64 flex-shrink-0 flex-col pt-16 duration-75 lg:flex transition-width drawer-side hidden"
            : "fixed top-0 left-0 z-20 h-[calc(100vh_-_70px)] w-64 flex-shrink-0 flex-col pt-16 duration-75 lg:flex transition-width drawer-side flex"
        }
        aria-label="Sidebar"
      >
        <div class="relative flex flex-col flex-1 min-h-0 pt-0 border-r border-base-400 bg-base-300 text-base-content">
          <div class="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
            <div class="flex-1 px-3 space-y-1 divide-y">
              <ul class="pb-2 space-y-2 menu menu-compact">
                <li>
                  <form action="#" method="get" class="lg:hidden">
                    <label html-for="mobile-search" class="sr-only">
                      Search
                    </label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          class="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                        </svg>
                      </div>
                      <input
                        type="text"
                        name="email"
                        id="mobile-search"
                        class="border text-sm rounded-lg focus:primary focus:primary block w-full pl-10 p-2.5"
                        placeholder="Search"
                      />
                    </div>
                  </form>
                </li>
                <For each={ARR_SIDEBAR}>
                  {(m) => (
                    <li>
                      <A
                        href={m.path}
                        class={
                          location.pathname === m.path
                            ? "flex items-center p-2 text-base font-normal rounded-lg group active"
                            : "flex items-center p-2 text-base font-normal rounded-lg group"
                        }
                      >
                        <svg
                          class="w-6 h-6 transition duration-75"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {m.svgPath()}
                        </svg>
                        {(!m.hint && <span class="flex-1">{m.title}</span>) || (
                          <>
                            <span class="flex-1">{m.title}</span>
                            <span class="flex-none lowercase badge badge-sm">
                              {m.hint}
                            </span>
                          </>
                        )}
                      </A>
                    </li>
                  )}
                </For>
              </ul>
            </div>
          </div>
        </div>
      </aside>
      <div
        class="fixed inset-0 z-10 hidden bg-gray-900 opacity-50"
        id="sidebarBackdrop"
      ></div>
    </div>
  );
}

export { Sidebar };
