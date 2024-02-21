import { useCallback, useEffect, useState, useRef } from "react";

import ProfileChip from "../../profile/profile-chip.jsx";
import createWrapper from "./create-wrapper.js";

export default function SigninButton({ sx = {} }) {
  const [button, setButton] = useState(null);
  const click = useCallback(() => {
    if (button) {
      button.click();
    } else {
      console.warn("button not created yet");
    }
  }, [button]);

  useEffect(() => {
    if (!button) {
      const buttonWrapper = createWrapper();
      setButton(buttonWrapper.button);
    }
  }, [button]);

  return (
    <ProfileChip label="Sign in with Google" onClick={click} sx={{ ...sx }} />
  );
}
