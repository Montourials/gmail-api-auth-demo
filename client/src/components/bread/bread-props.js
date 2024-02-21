import PropTypes from "prop-types";

import { doughProps } from "./dough/dough-props.js";

const breadProps = {
  type: PropTypes.oneOf(["err", "error", "info", "success", "warn"]),
  ...doughProps,
};

export default breadProps;
