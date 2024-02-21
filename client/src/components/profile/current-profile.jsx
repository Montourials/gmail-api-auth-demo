import { useContext } from "react";
import { Box } from "@mui/material";
import VerifiedUserIcon from "~icons/ic/verified-user";

import { ProfileContext } from "src/context/__index.js";
import { getSessionToken } from "src/util/__index.js";

import SigninButton from "../buttons/signin/SigninButton.jsx";
import ProfileChip from "./profile-chip.jsx";

export default function CurrentProfile({ sx = {} }) {
  const { currentProfile } = useContext(ProfileContext);
  const isVerified = currentProfile && currentProfile.emailAddress;

  const session = getSessionToken();

  return (
    <Box
      sx={{
        ...sx,
      }}
    >
      {!session && <SigninButton />}
      {isVerified && (
        <ProfileChip
          icon={<VerifiedUserIcon />}
          label={`${currentProfile?.emailAddress}`}
          color="success"
        />
      )}
    </Box>
  );
}
