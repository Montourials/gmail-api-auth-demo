import { useContext, useRef, useState } from "react";
import PropTypes from "prop-types";

import { useGISClient } from "src/hooks/__index.js";
import { login } from "src/services/__index.js";
import { setSessionToken, clearSessionToken } from "src/util/__index.js";

import UserStatusContext from "../user-status/user-status-context.js";
import ProfileContext from "./profile-context.js";

///Initialize Google Sign-in (GSI) services and provide the signed-in profile through Context
export default function ProfileProvider({
  children,
  autoPrompt = false,
  autoSelect = true,
}) {
  const { init, client } = useGISClient();

  const { setStatus } = useContext(UserStatusContext);

  const [currentProfile, setCurrentProfile] = useState(null);
  const loginSuccessRef = useRef(false);

  const handleSignin = async (credentialResponse) => {
    setStatus.loggingIn();
    const { user, isNewUser, sessionToken } = await login(credentialResponse);

    if (!user || !sessionToken) {
      console.error("unexpected response from login request");
      setStatus.fresh();
      return;
    }

    loginSuccessRef.current = true;
    setSessionToken(`Bearer ${sessionToken}`);
    setStatus.loggedIn();

    setCurrentProfile(user);
  };

  function signin() {
    loginSuccessRef.current = false;
    init({ callback: handleSignin, autoPrompt, autoSelect });
  }

  function signout() {
    loginSuccessRef.current = false;
    setStatus.fresh();
    clearSessionToken();
    setCurrentProfile(null);
  }

  if (!client) {
    signin();
  }

  return (
    <ProfileContext.Provider
      value={{
        currentProfile,
        loginSuccess: loginSuccessRef.current,
        signin,
        signout,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

ProfileProvider.propTypes = {
  children: PropTypes.node.isRequired,
  autoPrompt: PropTypes.bool,
  autoSelect: PropTypes.bool,
};
