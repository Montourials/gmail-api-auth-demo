import { GIS, OAUTH } from "src/config/__index.js";

///Returns one or both of the basic google clients that are pre-loaded in index.html: window.google.accounts.id/oauth2
export default function useGoogle(type = "both") {
  const useGis = type.toLowerCase() === "gis";
  const useOAuth = type.toLowerCase() === "oauth";

  if (!useGis && !useOAuth) {
    throw new TypeError("invalid argument type passed to useClient hook");
  }

  return {
    gis: useGis && GIS(),
    oauth: useOAuth && OAUTH(),
  };
}
