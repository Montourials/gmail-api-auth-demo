import _ from "lodash";

export const buildFilterArray = (filters) => {
  if (!filters || `${filters}` === "{}") return [];

  const filtersToReturn = [];

  const { search, ...quickFilters } = filters;

  const searchFilter = search ? { $regex: new RegExp(search, "i") } : {};

  _.forEach(quickFilters, (_value, filterName) => {
    let filter = { ...searchFilter };

    switch (filterName) {
      case "example quick filter name (eg 'has x field'":
        filter["field name"] = { $exists: true };
        break;

      default:
        break;
    }

    filtersToReturn.push(filter);
  });

  return filtersToReturn;
};

export default {
  buildFilterArray,
};
