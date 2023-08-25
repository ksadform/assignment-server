const { gql } = require("apollo-server-express");

exports.notificationTypedefs = gql`
  enum NotificationType {
    SUCCESS
    ERROR
    INFO
  }

  type Notification {
    _id: ID
    name: String
    type: NotificationType
  }

  input NotificationInput {
    name: String
    type: NotificationType
  }

  input GetNotificationInput {
    filterModel: String
    sortModel: String
    startRow: Int
    endRow: Int
  }

  type Query {
    getNotifications(input: GetNotificationInput): [Notification]
    getNotification(id: ID): Notification
  }

  type Mutation {
    createNotification(input: NotificationInput): Notification
  }
`;
