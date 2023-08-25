const { tryCatch } = require("../../util");
const { NotificationModel } = require("../mongoose");
const { buildMongoQuery, buildSortQuery } = require("./notification.service");

const request = {
  endRow: 10,
  filterModel: {},
  groupKeys: [],
  pivotCols: [],
  pivotMode: false,
  rowGroupCols: [],
  sortModel: [],
  startRow: 0,
  valueCols: [],
};

exports.notificationResolvers = {
  Query: {
    getNotifications: async (root, { input }) => {
      let { filterModel, sortModel, startRow, endRow } = input ?? {};
      filterModel = JSON.parse(filterModel);
      sortModel = JSON.parse(sortModel);

      const mongoQuery = buildMongoQuery(filterModel);
      const sortQuery = buildSortQuery(sortModel);
      sortQuery.push(["createdAt", -1]);

      console.log({ filterModel, sortModel, startRow, endRow });

      const [data, error] = await tryCatch(() =>
        NotificationModel.find(mongoQuery).sort(sortQuery)
      );
      if (error) console.error(error);
      return data;
    },
    getNotification: async (root, { id }) => {
      const [data, error] = await tryCatch(() =>
        NotificationModel.findById(id)
      );
      if (error) console.error(error);
      return data;
    },
  },

  Mutation: {
    createNotification: async (root, { input }) => {
      const [data, error] = await tryCatch(() =>
        NotificationModel.create(input)
      );
      if (error) console.error(error);
      return data;
    },
  },
};
