const Data = require("../model/data");

exports.saveData = async (req, res) => {
  const data = new Data(req.body);
  await data.save();
  res.send(true);
};

exports.getData = async (req, res) => {
  const data = await Data.find();
  res.send(data);
};
