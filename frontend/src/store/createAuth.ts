import { createSignal, createResource } from "solid-js";
import { loginUser } from "~/apis";

interface AuthProps {
    id: string;
    password: string;
};

const INIT_AUTH = {
    id: '', 
    password: '' 
};

export default function createAuth(state: any, setState: any, actions: any) {
    const [auth, setAuth] = createSignal<AuthProps>(INIT_AUTH); 
    const [isLogined, setIsLogined] = createSignal<boolean>(false); 
    const [authenticated] = createResource(auth, loginUser, { deferStream: true });
    // const [authenticated, { mutate, refetch }] = createResource(auth, fetchUser);
    
    Object.assign(actions, {
        setAuth,
        setIsLogined,
    });

    return { authenticated, isLogined };
};
