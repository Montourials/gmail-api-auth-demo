import makeRequest from "../make-request.jsx";

export default async function getAuthzUrl() {
  try {
    const resData = await makeRequest({
      router: "authz",
      route: "consent",
      method: "get",
    });

    return resData;
  } catch (e) {
    console.error("failed to send authz code:", e.message);
  }
}
