const User = require("../model/user");

exports.saveUser = async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send(true);
};

exports.getUser = async (req, res) => {
  const user = await User.find();
  res.send(user);
};

exports.getLoginDeatails = async (req, res) => {
  let result = false;
  const user = await User.find({}, { email: 1, password: 1, _id: 0 });
  user.forEach((data) => {
    if (
      req.params.email == data.email &&
      req.params.password == data.password
    ) {
      result = true;
    }
  });
  res.send(result);
};

exports.getExistsEmail = async (req, res) => {
  let result = false;
  const user = await User.find({}, { email: 1, _id: 0 });
  user.forEach((data) => {
    if (req.params.email == data.email) {
      result = true;
    }
  });
  res.send(result);
};
