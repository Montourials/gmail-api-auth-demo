import { useCallback, useState } from "react";

import { CLIENT_ID } from "src/config/__index.js";

import useGoogle from "./_use-google.jsx";

///Return the Google Identity Services client for user authentication and a function to intialize it
export default function useGISClient() {
  const { gis } = useGoogle("gis");
  const [client, setClient] = useState(null);

  const init = useCallback(
    ({ callback, autoPrompt, autoSelect }) => {
      if (!gis) {
        throw new Error("Google Identity Services was not pre-loaded");
      }

      if (!callback) {
        throw new Error(
          "no callback provided to handle gsi credential response"
        );
      }

      const gisClient = gis.initialize({
        client_id: CLIENT_ID,
        callback,
        auto_prompt: autoPrompt,
        auto_select: autoSelect,
        context: "use",
        ux_mode: "popup",
        itp_support: "true", //Enables upgraded One Tap UX on ITP browsers
      });

      setClient(gisClient);
    },
    [gis]
  );

  return { init, client };
}
