import makeRequest from "../make-request.jsx";

///Posts a request to our server's login route with the ID credentials received from GIS/Google Sign-in
export default async function login(credentialResponse) {
  if (!credentialResponse || !credentialResponse.credential) {
    throw new Error("missing credential");
  }

  const gidToken = `${credentialResponse.credential}`;

  try {
    const resData = await makeRequest({
      router: "auth",
      route: "login",
      method: "post",
      data: { gidToken },
      useSessionToken: false,
    });
    return resData;
  } catch (e) {
    console.error("login failed", e);
  }
}
