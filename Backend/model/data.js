const mongo = require("mongoose");

const data = mongo.Schema(
  {
    key: Number,
    type: String,
    month: String,
    status: String,
    price: String,
    date: String,
  },
  { collection: "data" }
);

module.exports = mongo.model("Data", data);
