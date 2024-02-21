import { red } from "@mui/material/colors";

import Icon from "~icons/ic/sharp-warning";

import Dough from "../dough/dough.jsx";
import { doughProps } from "../dough/dough-props.js";

export default function Err({ title, subheader, text }) {
  return (
    <Dough
      avatarColor={red[700]}
      avatar={<Icon />}
      title={title}
      subheader={subheader}
      text={text}
    />
  );
}

Err.propTypes = { ...doughProps };
