import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { SigninButton } from "src/components/__index.js";
import { uris } from "src/config/__index.js";
import { ProfileContext } from "src/context/__index.js";

import AppInfo from "../app-info/AppInfo.jsx";

import SuccessToast from "./success-toast.jsx";
import WelcomeHeader from "./welcome-header.jsx";

export default function Welcome() {
  const { loginSuccess } = useContext(ProfileContext);
  const navigate = useNavigate();

  return (
    <>
      {loginSuccess && <SuccessToast callback={() => navigate(uris.profile)} />}
      <WelcomeHeader />
      <AppInfo />
      <SigninButton />
    </>
  );
}
