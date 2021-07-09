const Data = require("../model/data");

exports.saveData = async (req, res) => {
  const data = new Data(req.body);
  await data.save();
  res.send(true);
};

exports.getData = async (req, res) => {
  const data = await Data.find({}, { _id: 0, __v: 0 }).sort({ key: -1 });
  // .skip(1);
  res.send(data);
};
