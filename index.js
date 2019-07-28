const config = require("./config");
const knex = require("knex")(config.db);
const models = require("./models")(knex);
const express = require("express");
const app = express();

app.listen(config.express.port, () => {
  models.sentences.list().then(data => console.log(data));
  console.log("Server running on port ", config.express.port);
});
