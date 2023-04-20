import { createSignal } from "solid-js";

export default function createLayout(state: any, setState: any, actions: any) {
    const [theme, setTheme] = createSignal<string>('dark');
    const [sidebar, setSidebar] = createSignal<boolean>(true);

    Object.assign(actions, {
        setTheme(theme: string) {
            setTheme(theme);
        },
        setSidebar(sidebar: boolean) {
            setSidebar(sidebar);
        }
    })
    
    return { theme, sidebar };
}
