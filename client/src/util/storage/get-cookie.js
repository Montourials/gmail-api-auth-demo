export default function getCookie(cookieName = "g_state") {
  return window.document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${cookieName}=`))
    ?.split("=")[1];
}
