const mongo = require("mongoose");

const user = mongo.Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  { collection: "user" }
);

module.exports = mongo.model("User", user);
