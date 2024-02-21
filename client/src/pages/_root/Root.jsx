import { useEffect } from "react";
import { Outlet, useNavigate, useMatch } from "react-router-dom";

import { uris } from "src/config/__index.js";
import { ProfileProvider, UserStatusProvider } from "src/context/__index.js";

import AppBar from "./app-bar/AppBar.jsx";

import PageContainer from "./page-container.jsx";

export default function Root() {
  const navigate = useNavigate();
  const isRootPage = useMatch(uris.root);

  useEffect(() => {
    if (isRootPage) {
      navigate("/welcome");
    }
  }, [isRootPage, navigate]);

  return (
    <div id="App">
      <UserStatusProvider>
        <ProfileProvider>
          <PageContainer>
            <AppBar />
            <Outlet />
          </PageContainer>
        </ProfileProvider>
      </UserStatusProvider>
    </div>
  );
}
