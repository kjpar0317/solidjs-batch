import { createSignal, createResource } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { fetchUser } from "~/apis";

export interface AuthProps {
    id: string;
    passwd: string;
}

export function useAuth() {
    const navigate = useNavigate();
    const [authObj, setAuthObj] = createSignal({ id: '', passwd: ''});
    const [authenticated, { mutate, refetch }] = createResource(authObj, fetchUser);

    function doLogin(values: AuthProps) {
        setAuthObj({id: values.id, passwd: values.passwd});

        refetch();

        if(authenticated()) {
            const data = authenticated();
        
            sessionStorage.setItem("token", data.token);

            navigate("/");
        }
        
    }

    function doLogout() {
        sessionStorage.removeItem("token");
    }

    return { doLogin, doLogout };
}

export default useAuth;