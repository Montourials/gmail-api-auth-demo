import { useEffect } from "react";
import { Typography } from "@mui/material";

import { RowCentered } from "src/components/__index.js";

export default function ProfileDisplay({ profile }) {
  const { userId, email, isEmailVerified, name, picture, id, isNewUser } =
    profile;

  useEffect(() => {
    if (isNewUser) {
      window.localStorage.setItem("__gh_isNewUser", "true");
    } else {
      window.localStorage.removeItem("__gh_isNewUser");
    }
  }, [isNewUser]);

  if (!profile) return;

  const helloText = isNewUser
    ? `Hello, ${name}! Welcome to the app!`
    : `Welcome back, ${name}!`;

  return (
    <>
      <Typography variant="h3">{helloText}</Typography>
      <RowCentered sx={{ marginY: "1em" }}>
        <img src={picture} />
        <Typography variant="h5" sx={{ marginX: "1em" }}>
          {email}
        </Typography>
      </RowCentered>
    </>
  );
}
