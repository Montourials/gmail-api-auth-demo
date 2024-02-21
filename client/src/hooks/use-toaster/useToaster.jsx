import { useCallback, useEffect } from "react";
import { toast as toastify } from "react-toastify";
import { v4 as uuid } from "uuid";

import { makeToast } from "src/util/__index.js";

/*
toastIdRef: A fresh ref passed from useRef(null) that is used to handle the toastId, change handler, and cleanup

Returns:
toast<func>: Makes a single toast and handles updating the id ref, returning toastify's toast.onChange cleanup function
makeToast<func>: Alias for toast
onToastChange<func>: Pass a callback to run when the toast meets desired status
*/
export default function useToaster(toastIdRef) {
  const toast = useCallback(
    (bread, toasterProps = {}) => {
      const currentRef = toastIdRef.current;
      let toastId = currentRef;

      if (!currentRef) {
        toastId = uuid();
        makeToast({ ...toasterProps, bread, toastId });
        toastIdRef.current = toastId;
      }

      return toastify.onChange(({ status, id }) => {
        if (status === "removed" && id === toastIdRef.current) {
          toastIdRef.current = null;
        }
      });
    },
    [toastIdRef]
  );

  const onToastChange = useCallback(
    (callback, desiredStatus = "removed") => {
      return toastify.onChange(({ status, id }) => {
        if (status === desiredStatus && id === toastIdRef.current) {
          callback();
        }
      });
    },
    [toastIdRef]
  );

  const reset = useCallback(() => (toastIdRef.current = null), [toastIdRef]);

  if (!toastIdRef) {
    return console.error("no ref passed to useToaster");
  }

  return {
    toast,
    makeToast: toast,
    onToastChange,
    reset,
  };
}
