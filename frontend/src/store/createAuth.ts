import { createSignal, createResource } from "solid-js";
import { fetchUser } from "~/apis";

export default function createAuth(state: any, setState: any, actions: any) {
    const [auth, setAuth] = createSignal({ id: '', passwd: '' }); 
    const [authenticated, { mutate, refetch }] = createResource(auth, fetchUser);

    Object.assign(actions, {
        doLogin(values: IAuthProps) {
            setAuth({ id: values.id, passwd: values.passwd });

            refetch();
        },
        doLogout() {
            setAuth({ id: "", passwd: "" });

            sessionStorage.removeItem("token");
        }
    });

    return authenticated;
};
