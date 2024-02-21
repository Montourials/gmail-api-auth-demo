import { useEffect, useRef } from "react";

import { useToaster } from "src/hooks/__index.js";

import Bread from "../bread/bread.jsx";

const message = {
  type: "warn",
  title: "You have not yet authorized this app to access data on your behalf",
  subheader: `This is required for the app to function, please tap the sign-in button to continue`,
  text: `We use Google OAuth - see their privacy policy and oauth policy for more information`,
  position: "bottom_center",
  duration: false,
};

export default function Unauthorized() {
  const toastRef = useRef(null);
  const { makeToast, reset } = useToaster(toastRef);

  useEffect(() => {
    const cleanup = makeToast(<Bread {...message} />, {
      ...message,
    });

    return () => {
      cleanup();
      reset();
    };
  }, [makeToast, reset]);
}
