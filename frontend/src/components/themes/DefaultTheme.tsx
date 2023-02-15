import { JSXElement, Switch, Match } from "solid-js";
import { useNavigate } from "solid-start";

import { useStore } from "~/store";
import Login from "~/routes/login";
import { Header, Sidebar, Footer } from "../layouts/common";

interface DefaultThemeProps {
  children: JSXElement;
}

export default function DefaultTheme(props: DefaultThemeProps) {
  const navigate = useNavigate();
  const [store] = useStore();

  function isAuthenticated() {
    const accessToken =
      typeof window !== "undefined" ? sessionStorage.getItem("token") : null;

    if (accessToken) {
      return true;
    } else {
      navigate("/login");
    }
  }

  return (
    <div data-theme={store.layouts.theme()} class="w-full h-full">
      <Switch>
        <Match when={isAuthenticated()}>
          <Header />
          <Sidebar />
          <main class="relative w-full overflow-y-auto border-base-300 bg-base-200 pt-20 text-base-content h-[calc(100vh_-_70px)] lg:ml-64 lg:w-[calc(100%_-_16rem)]">
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
