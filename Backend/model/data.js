const mongo = require("mongoose");

const data = mongo.Schema(
  {
    type: String,
    month: String,
    status: String,
    price: String,
    key: String,
  },
  { collection: "data" }
);

module.exports = mongo.model("Data", data);
