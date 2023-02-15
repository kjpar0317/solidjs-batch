import { createContext, JSXElement, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import createLayout from "./createLayout";
import createAuth from "./createAuth";

const StoreContext = createContext();

export function Provider(props: { children : JSXElement}) {
    let layouts: any, auths: any;

    // const router = createRouteHandler("");
    const [state, setState] = createStore({
        get layouts() {
            return layouts;
        },
        get auths() {
            return auths;
        }
    });

    const actions = {};

    const store = [
        state, actions
    ];

    layouts = createLayout(state, setState, actions);
    auths = createAuth(state, setState, actions);

  return (
        <StoreContext.Provider value={store}>
            {props.children}
        </StoreContext.Provider>
  );
}

export function useStore() {
    return useContext(StoreContext);
};
