export async function fetchUser(auth: any) {
  if(!auth.id || !auth.passwd) return;

  return (await fetch(`/api/batch/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(auth),
    })).json();
}
