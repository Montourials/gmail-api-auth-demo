import { Avatar, Box, Typography } from "@mui/material";

import { doughPropsFull } from "./dough-props.js";

///What forms the Bread
export default function Dough({ title, subheader, text, avatarColor, avatar }) {
  const isTitleOnly = !subheader && !text;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flex: 1,
      }}
    >
      <Avatar sx={{ alignSelf: "center", bgcolor: avatarColor }}>
        {avatar}
      </Avatar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          ml: 1,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            whiteSpace: "nowrap",
            //If no other text, title style gets slight adjustment to properly center it vertically within the message box
            alignSelf: isTitleOnly ? "center" : "flex-start",
            mt: isTitleOnly ? "0.1rem" : 0,
          }}
        >
          {title}
        </Typography>
        <Typography variant="subtitle1">{subheader}</Typography>
        <Typography variant="body2">{text}</Typography>
      </Box>
    </Box>
  );
}

Dough.propTypes = {
  ...doughPropsFull,
};
