import Err from "./types/err.jsx";
import Info from "./types/info.jsx";
import Success from "./types/success.jsx";
import Warn from "./types/warn.jsx";

import breadProps from "./bread-props.js";

export default function Bread({ type, title, subheader, text }) {
  const props = { title, subheader, text };

  switch (type) {
    case "info":
      return <Info {...props} />;
    case "err" || "error":
      return <Err {...props} />;
    case "success":
      return <Success {...props} />;
    case "warn":
      return <Warn {...props} />;
    default:
      return <Info {...props} />;
  }
}

Bread.propTypes = {
  ...breadProps,
};
