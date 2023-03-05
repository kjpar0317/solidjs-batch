import type { JSXElement } from "solid-js";
import { onMount, onCleanup, createEffect, on, Switch, Match } from "solid-js";
import { useNavigate } from "solid-start";

import { useStore } from "~/store";
import Login from "~/routes/login";
import { Header, Sidebar, Footer } from "../layouts/common";

interface DefaultThemeProps {
  children: JSXElement;
}

export default function DefaultTheme(props: DefaultThemeProps): JSXElement {
  const navigate = useNavigate();
  const [store, { setIsLogined }] = useStore();

  onMount(() => store.websocket.connect());

  onCleanup(() => store.websocket.disconnect());

  createEffect(
    on(
      store.websocket?.socketState,
      (ws: any) => {
        if (ws === 3) {
          store.websocket.disconnect();
          console.log("websocket reconnect");
          store.websocket.connect();
        }
      },
      { defer: true }
    )
  );

  function isAuthenticated() {
    const accessToken =
      typeof window !== "undefined" ? sessionStorage.getItem("token") : null;

    if (accessToken) {
      setIsLogined(true);
      return true;
    } else {
      navigate("/login", { replace: true });
    }
  }

  return (
    <div data-theme={store.layout.theme()} class="w-full h-full">
      <Switch>
        <Match when={isAuthenticated()}>
          <Header />
          <Sidebar />
          <main
            class="relative w-full overflow-y-auto border-base-300 bg-base-200 pt-20 text-base-content h-[calc(100vh_-_70px)] lg:ml-64 lg:w-[calc(100%_-_16rem)]"
            classList={{ "w-full": !store.layout.sidebar() }}
          >
            {props.children}
          </main>
          <Footer />
        </Match>
        <Match when={!isAuthenticated()}>
          <Login />
        </Match>
      </Switch>
    </div>
  );
}
