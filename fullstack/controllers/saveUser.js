const SaveUser = require("../models/saveUser");
const errorHandler = require("../utils/errorHandler");
var ObjectId = require("mongodb").ObjectID;
module.exports.saveUser = async (req, res) => {
  const user = new SaveUser({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    phone: req.body.phone,
    email: req.body.email,
    city: req.body.city,
    country: req.body.country,
    address: req.body.address,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword
  });

  try {
    await user.save();
    res.status(201).json(user);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.getUser = async (req, res) => {
  await SaveUser.find((err, data) => {
    res.send(data);
  });
};

module.exports.deleteUser = async (req, res) => {
  SaveUser.findByIdAndRemove(req.params.id,(err, data) => {
    if(err) res.json(err);
    else res.json('Successfully removed');
  });
}
