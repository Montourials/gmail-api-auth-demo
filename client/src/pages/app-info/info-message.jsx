import PropTypes from "prop-types";
import {
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from "@mui/material";

import { useScreenSize } from "src/hooks/__index.js";

export default function InfoMessage({ icon, primaryText, secondaryText }) {
  const { xs, sm, md } = useScreenSize();

  let containerStyle = {
    maxWidth: xs ? "100%" : sm ? "98%" : md ? "95%" : "90%",
    pl: xs ? 0 : sm ? 2 : md ? 12 : 32,
  };

  const dividerStyle = {
    maxWidth: xs ? "98%" : sm ? "95%" : "92%",
    m: "auto",
  };

  return (
    <>
      <Box sx={containerStyle}>
        <ListItem>
          <ListItemAvatar>{icon}</ListItemAvatar>
          <ListItemText
            primary={primaryText}
            secondary={secondaryText}
            sx={{ whiteSpace: "pre-line" }}
          />
        </ListItem>
      </Box>
      <Divider sx={dividerStyle} />
    </>
  );
}

InfoMessage.propTypes = {
  icon: PropTypes.element.isRequired,
  primaryText: PropTypes.string,
  secondaryText: PropTypes.string,
};
