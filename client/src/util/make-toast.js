import { toast } from "react-toastify";

const defaults = {
  position: toast.POSITION.TOP_RIGHT,
  duration: 5000,
  delay: 0,
  sx: {},
};

export function makeToast(
  {
    bread,
    toastId,
    id, //Can pass through either id or toastId for convenience
    position = defaults.position,
    duration = defaults.duration,
    delay = defaults.delay,
    sx = defaults.sx,
  } = { ...defaults }
) {
  try {
    const top = position.substring(0, 2) === "top" ? "4rem" : null;
    const bottom = position.substring(0, 5) === "bottom" ? "4rem" : null;

    const style = {
      top,
      bottom,
      ...sx,
    };

    toast(bread, {
      toastId: toastId ?? id,
      autoClose: duration,
      position,
      delay,
      style,
    });
  } catch (e) {
    console.warn(`failed to make toast`, e.message);
  }
}

export default {
  makeToast,
};
