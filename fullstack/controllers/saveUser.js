const SaveUser = require("../models/saveUser");
const errorHandler = require("../utils/errorHandler");

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
    confirmPassword: req.body.confirmPassword,
  });
  
  try {
    await user.save();
    res.status(201).json(user);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.getUser = async (req, res) => {
  const candidate = await SaveUser.findOne({ email: email });
  res.status(201).json(candidate);
  };