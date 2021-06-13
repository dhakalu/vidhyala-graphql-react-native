const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const mongoose = require("mongoose");
const schema = require("./graphql/schema");
const rootValue = require("./graphql/resolvers");

/**
 * Enable Cors
 */
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Menthods", "GET, POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  })
);

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.aem1h.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected fine!");
    app.listen(4000, (error) => {
      if (!error) {
        console.log("Listening in port 4000");
      }
    });
  })
  .catch((err) => {
    // TODO: add retry error
    console.log("could not connect", err);
  });
