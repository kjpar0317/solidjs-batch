import { createSignal, createResource } from "solid-js";
import { loginUser } from "~/apis";

export default function createAuth(state: any, setState: any, actions: any) {
    const [auth, setAuth] = createSignal({ id: '', password: '' }); 
    const [authenticated] = createResource(auth, loginUser);
    // const [authenticated, { mutate, refetch }] = createResource(auth, fetchUser);
    
    Object.assign(actions, {
        setAuth,
    });

    return authenticated;
};
