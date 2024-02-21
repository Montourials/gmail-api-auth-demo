import { Typography } from "@mui/material";
import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { SigninButton } from "src/components/__index.js";
import { welcome } from "src/config/__index.js";
import { ProfileContext } from "src/context/__index.js";

export default function SignedOut() {
  const timerRef = useRef(null);
  const navigate = useNavigate(welcome);

  const { signout } = useContext(ProfileContext);

  useEffect(() => {
    signout();

    if (!timerRef.current) {
      timerRef.current = setTimeout(() => navigate(welcome), 6000);
    }

    return () => signout();
  }, [signout, navigate]);

  return (
    <>
      <Typography variant="h4" sx={{ my: 2 }}>
        You have been signed out
      </Typography>
      <Typography variant="h5" sx={{ my: 2 }}>
        The browser will redirect you in a moment, unless you tap the button
        below to sign in again
      </Typography>
      <div onClick={() => clearTimeout(timerRef.current)}>
        <SigninButton sx={{ my: 1 }} />
      </div>
    </>
  );
}
