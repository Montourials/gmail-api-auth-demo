///Returns false if given value is falsy, not a string, or is a string with invalid symbols.
//Third param chooses what to return if valid (done because I didn't want to break the former implementation - should refactor)
export const checkInvalidString = (
  param,
  allowSlashes = false,
  returnValidString = true
) => {
  if (!param || typeof param !== "string") {
    return false;
  }

  const match = allowSlashes
    ? /[-$%#@^&*';":<>,.~`_+=({})\[\]]+/
    : /[-$%#@^&*';":<>,.~`\_+=({})\[\]\\\/]+/;

  if (match.test(param)) {
    return false;
  }

  if (returnValidString) {
    return param;
  } else {
    return true;
  }
};

export default {
  checkInvalidString,
};
