import { green } from "@mui/material/colors";

import Icon from "~icons/ic/round-check-circle";

import Dough from "../dough/dough.jsx";
import { doughProps } from "../dough/dough-props.js";

export default function Success({ title, subheader, text }) {
  return (
    <Dough
      type="success"
      avatarColor={green[500]}
      avatar={<Icon />}
      title={title}
      subheader={subheader}
      text={text}
    />
  );
}

Success.propTypes = { ...doughProps };
