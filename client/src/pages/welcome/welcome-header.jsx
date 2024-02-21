import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { useScreenSize } from "src/hooks/__index.js";

export default function WelcomeHeader() {
  const { xs: isSmallScreen } = useScreenSize();

  const header = "Hey there!";

  return (
    <>
      <Typography variant={isSmallScreen ? "h4" : "h3"}>{header}</Typography>
      <Typography variant={isSmallScreen ? "h5" : "h4"} sx={{ mt: 1, mb: 2 }}>
        Before you begin, please read all of the information below!
      </Typography>
      <Divider />
      <Divider />
    </>
  );
}
