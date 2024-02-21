import { useContext, useEffect, useRef } from "react";
import { toast as toastify } from "react-toastify";
import { v4 as uuid } from "uuid";

import { BreadPreset } from "src/components/__index.js";
import { makeToast } from "src/util/__index.js";

const defaultMessage =
  "You will be redirected in a moment, or upon closing this message";

export default function SuccessToast({ callback, message = defaultMessage }) {
  const toast = useRef(null);

  useEffect(() => {
    const breadText = message ?? defaultMessage;
    const bread = <BreadPreset type="success" subtitle={breadText} />;

    let toastId = toast.current;

    if (!toastId) {
      toastId = uuid();
      makeToast({ bread, toastId });
      toast.current = toastId;
    }

    if (!callback) return;

    return toastify.onChange(({ status, id }) => {
      if (status === "removed" && id === toastId) {
        callback();
      }
    });
  }, [message, callback]);
}
