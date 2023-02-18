import { createSignal, createResource } from "solid-js";
import { fetchUser } from "~/apis";

export default function createAuth(state: any, setState: any, actions: any) {
    const [auth, setAuth] = createSignal({ id: '', passwd: '' }); 
    const [authenticated] = createResource(auth, fetchUser);
    // const [authenticated, { mutate, refetch }] = createResource(auth, fetchUser);
    
    Object.assign(actions, {
        setAuth,
    });

    return authenticated;
};
