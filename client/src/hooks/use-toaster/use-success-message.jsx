import { useCallback } from "react";

import useToaster from "./useToaster.jsx";

export default function useSuccessMessage(duration = 2000) {
  const makeToast = useToaster({});

  const successMessage = useCallback(
    (id) => {
      makeToast({
        _id: id,
        _type: "success",
        _title: "Success!",
        _subheader:
          "You will be redirected in a moment, or upon closing this message",
        _duration: duration,
        _delay: 0,
      });
    },
    [makeToast, duration]
  );

  return successMessage;
}
