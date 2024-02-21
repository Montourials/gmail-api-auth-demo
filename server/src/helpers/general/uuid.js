import { v4 as uuid, validate } from "uuid";

export const createUuid = () => {
  return uuid();
};

export const isUuid = (stringToCheck) => {
  return validate(stringToCheck);
};

export default {
  createUuid,
  isUuid,
};
