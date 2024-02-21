///Get an ID from an object, if it has one
export function getId(object) {
  return object?.id ?? object?._id ?? null;
}

///Get an array of IDs from an array of objects, in no particular order and returning nothin' but IDs
export function getIds(array) {
  if (!Array.isArray(array)) {
    throw new TypeError("the getIds helper was passed a non-array value");
  }

  const ids = array.map((object) => {
    return getId(object);
  });

  return ids;
}

export default { getId, getIds };
