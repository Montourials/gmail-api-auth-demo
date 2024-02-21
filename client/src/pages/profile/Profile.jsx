import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { ProfileContext } from "src/context/__index.js";

import ProfileDisplay from "./profile-display.jsx";
import Options from "./options.jsx";

export default function Profile() {
  const { currentProfile } = useContext(ProfileContext);

  const navigate = useNavigate();

  return (
    <>
      <ProfileDisplay profile={currentProfile} />
      <Options />
    </>
  );
}
