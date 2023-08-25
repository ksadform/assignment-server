const filterType = {
  EQUALS: "equals",
  CONTAINS: "contains",
  NOT_CONTAINS: "notContains",
  NOT_EQUAL: "notEqual",
  STARTS_WITH: "startsWith",
  ENDS_WITH: "endsWith",
  BLANK: "blank",
  NOT_BLANK: "notBlank",
};

const operatorType = {
  AND: "AND",
  OR: "OR",
};

const checkFilterOperation = (key, query) => {
  if (query.type === filterType.EQUALS) {
    return { [key]: { $regex: new RegExp(`^${query.filter}$`, "i") } };
  }

  if (query.type === filterType.NOT_EQUAL) {
    return {
      [key]: { $not: { $regex: new RegExp(`^${query.filter}$`, "i") } },
    };
  }

  if (query.type === filterType.CONTAINS) {
    return { [key]: { $regex: new RegExp(query.filter, "i") } };
  }

  if (query.type === filterType.NOT_CONTAINS) {
    return { [key]: { $not: { $regex: new RegExp(query.filter, "i") } } };
  }

  if (query.type === filterType.STARTS_WITH) {
    return { [key]: { $regex: new RegExp(`^${query.filter}`, "i") } };
  }

  if (query.type === filterType.ENDS_WITH) {
    return { [key]: { $regex: new RegExp(`${query.filter}$`, "i") } };
  }

  if (query.type === filterType.BLANK) {
    return { [key]: null };
  }

  if (query.type === filterType.NOT_BLANK) {
    return { [key]: { $ne: null } };
  }
};

exports.buildMongoQuery = (filterModel) => {
  if (!Object.keys(filterModel)?.length) return {};
  const and = [];

  for (const key in filterModel) {
    const value = filterModel[key];

    const { operator = null, conditions = [] } = value ?? {};

    if (operator == operatorType.AND) {
      const queries = conditions.map((condition) =>
        checkFilterOperation(key, condition)
      );

      and.push({ $and: queries });
      continue;
    }

    if (operator === operatorType.OR) {
      const queries = conditions.map((condition) =>
        checkFilterOperation(key, condition)
      );

      and.push({ $or: queries });
      continue;
    }

    if (operator === null) {
      and.push(checkFilterOperation(key, value));
      continue;
    }
  }
  return { $and: and };
};

exports.buildSortQuery = (sortModel) => {
  if (!sortModel?.length) return [];
  return sortModel.map(({ sort, colId }) => [colId, sort === "asc" ? 1 : -1]);
};
