import PropTypes from "prop-types";

export const doughProps = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  text: PropTypes.string,
};

export const doughPropsFull = {
  ...doughProps,
  avatarColor: PropTypes.any.isRequired,
  avatar: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
};

export default {
  doughProps,
  doughPropsFull,
};
