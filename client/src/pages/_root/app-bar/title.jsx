import { Box, Typography } from "@mui/material";

import UnsubscribeIcon from "~icons/ic/outline-unsubscribe";

export default function Title() {
  const containerStyle = {
    flex: 2,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  };

  const titleStyle = {
    mb: "0.5rem",
    letterSpacing: "0.33rem",
    fontSize: "2.5rem",
    fontWeight: "bold",
    fontVariant: "all-petite-caps",
  };

  const logoStyle = {
    marginRight: titleStyle.letterSpacing,
    fontSize: "medium",
  };

  return (
    <Box sx={containerStyle}>
      <Typography variant="h1" sx={titleStyle}>
        Gmail
      </Typography>
      <UnsubscribeIcon style={logoStyle} />
      <Typography variant="h1" sx={titleStyle}>
        Helper
      </Typography>
    </Box>
  );
}
