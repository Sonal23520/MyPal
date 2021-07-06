const User = require("../model/user");

exports.saveUser = async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send("User Saved");
};

exports.getUser = async (req, res) => {
  const user = await User.find();
  res.send(user);
};
