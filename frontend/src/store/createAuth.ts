import { createSignal, createResource } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { fetchUser } from "~/apis";

export interface AuthProps {
    id: string;
    passwd: string;
};

export default function createAuth(state: any, setState: any, actions: any) {
    const navigate = useNavigate();
    const [auth, setAuth] = createSignal({ id: '', passwd: '' }); 
    const [authenticated, { mutate, refetch }] = createResource(auth, fetchUser);

    Object.assign(actions, {
        doLogin(values: AuthProps) {
            setAuth({ id: values.id, passwd: values.passwd });

            refetch();
        },
        doLogout() {
            sessionStorage.removeItem("token");
            navigate("/login");
        }
    });

    return authenticated;
};
