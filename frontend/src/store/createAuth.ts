import { createSignal, createResource } from "solid-js";
import { loginUser } from "~/apis";

export default function createAuth(state: any, setState: any, actions: any) {
    const [auth, setAuth] = createSignal(null); 
    const [isLogined, setIsLogined] = createSignal(false); 
    const [authenticated] = createResource(auth, loginUser, { initialValue: { id: '', password: '' }, deferStream: true,  });
    // const [authenticated, { mutate, refetch }] = createResource(auth, fetchUser);
    
    Object.assign(actions, {
        setAuth,
        setIsLogined,
    });

    return { authenticated, isLogined };
};
