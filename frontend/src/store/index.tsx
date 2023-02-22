import type { JSXElement } from "solid-js";
import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import createLayout from "./createLayout";
import createAuth from "./createAuth";
import createBatch from "./createBatch";

const StoreContext = createContext();

export function Provider(props: { children: JSXElement }) {
  let layout: any, auth: any, batch: any;

  // const router = createRouteHandler("");
  const [state, setState] = createStore({
    get layout() {
      return layout;
    },
    get auth() {
      return auth;
    },
    get batch() {
      return batch;
    },
  });

  const actions = {};

  const store = [state, actions];

  layout = createLayout(state, setState, actions);
  auth = createAuth(state, setState, actions);
  batch = createBatch(state, setState, actions);

  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
