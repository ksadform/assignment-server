require("dotenv").config();

const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const {
  notificationResolvers,
} = require("./modules/notification/notification.resolvers");
const {
  notificationTypedefs,
} = require("./modules/notification/notification.typedefs");
const cors = require("cors");

const server = new ApolloServer({
  typeDefs: notificationTypedefs,
  resolvers: notificationResolvers,
});

const app = express();

app.use(cors());

const main = async () => {
  await server.start();
  server.applyMiddleware({ app });
  app.get("/ping", (req, res) => res.send("ping"));

  app.listen(process.env.PORT, () =>
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
  );
};

main();
