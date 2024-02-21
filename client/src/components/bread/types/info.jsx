import { blue } from "@mui/material/colors";

import Dough from "../dough/dough.jsx";
import { doughProps } from "../dough/dough-props.js";

export default function Info({ title, subheader, text }) {
  return (
    <Dough
      type="info"
      avatarColor={blue[500]}
      avatar="GH"
      title={title}
      subheader={subheader}
      text={text}
    />
  );
}

Info.propTypes = { ...doughProps };
