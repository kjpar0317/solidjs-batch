import { createSignal, createResource } from "solid-js";
import { fetchUser } from "~/apis";

export interface AuthProps {
    id: string;
    passwd: string;
};

export default function createAuth(state: any, setState: any, actions: any) {
    const [auth, setAuth] = createSignal({ id: '', passwd: '' }); 
    const [authenticated, { mutate, refetch }] = createResource(auth, fetchUser);

    Object.assign(actions, {
        doLogin(values: AuthProps) {
            setAuth({ id: values.id, passwd: values.passwd });

            refetch();
        },
        doLogout() {
            sessionStorage.clear();
        }
    });

    return authenticated;
};
