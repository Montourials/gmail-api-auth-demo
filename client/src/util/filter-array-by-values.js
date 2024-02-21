function filterArrayByValues(mainArray, valuesToRemove, searchParameter) {
  const filteredArray = [];

  mainArray.forEach((item) => {
    const isValueToRemove = valuesToRemove.find(
      (unwantedThing) =>
        item[searchParameter] === unwantedThing[searchParameter]
    );

    if (!isValueToRemove) {
      filteredArray.push(item);
    }
  });

  return filteredArray;
}

export default {
  filterArrayByValues,
};
