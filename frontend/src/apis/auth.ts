import axiosUtils from "~/utils/axios-utils";

export async function loginUser(auth: any) {
  if(!auth.id || !auth.password) return;

  try {
    const res = await axiosUtils.post(`/api/batch/login`, auth);

    return res?.data;
  } catch {}
}

// export async function fetchUser(auth: any) {
//   if(!auth.id || !auth.passwd) return;

//   return (await fetch(`/api/batch/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(auth),
//     })).json();
// }
