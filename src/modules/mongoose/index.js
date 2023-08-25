const { notificationSchema } = require("../notification/notification.schema");

const mongoose = require("mongoose");

// Connecting Mongodb
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Checking for connection error
mongoose.connection.on("error", () =>
  console.error("Error while connecting to DB")
);

// Creating models
exports.NotificationModel = mongoose.model("Notifications", notificationSchema);
