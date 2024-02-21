import { orange } from "@mui/material/colors";

import Icon from "~icons/ic/twotone-notifications";

import Dough from "../dough/dough.jsx";
import { doughProps } from "../dough/dough-props.js";

export default function Warn({ title, subheader, text }) {
  return (
    <Dough
      type="warn"
      avatarColor={orange[400]}
      avatar={<Icon />}
      title={title}
      subheader={subheader}
      text={text}
    />
  );
}

Warn.propTypes = { ...doughProps };
