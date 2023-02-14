import { createSignal, createRoot } from "solid-js";

export function useLayout() {
    const [theme, setTheme] = createSignal("coperate");
    const [sidebar, setSidebar] = createSignal(true);

    return { theme, setTheme, sidebar, setSidebar };
}

export default useLayout;