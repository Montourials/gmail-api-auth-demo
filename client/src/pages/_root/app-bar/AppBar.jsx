import { AppBar as Bar, Toolbar } from "@mui/material";

import { CurrentProfile } from "src/components/__index.js";
import { useScreenSize } from "src/hooks/__index.js";

import Title from "./title.jsx";

export default function AppBar() {
  const { xs, small, medium, lg } = useScreenSize();

  const profileIconOffset = small ? 42 : medium ? 75 : lg ? 200 : 525;

  return (
    <Bar position="static">
      <Toolbar disableGutters={xs} id="back-to-top-anchor">
        <Title isSmallScreen={xs} />
        <CurrentProfile />
      </Toolbar>
    </Bar>
  );
}
