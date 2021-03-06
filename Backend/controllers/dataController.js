const Data = require("../model/data");

exports.saveData = async (req, res) => {
  const data = new Data(req.body);
  await data.save();
  res.send(true);
};

exports.getData = async (req, res) => {
  const data = await Data.find({}, { _id: 0, __v: 0 }).skip(
    parseInt(req.params.key)
  );
  res.send(data);
};

exports.getAllData = async (req, res) => {
  const data = await Data.find({}, { _id: 0, __v: 0 });
  res.send(data);
};

exports.getAllDataDiss = async (req, res) => {
  const data = await Data.find({}, { _id: 0, __v: 0 }).sort({ key: -1 });
  res.send(data);
};
