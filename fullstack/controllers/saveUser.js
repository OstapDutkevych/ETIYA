const SaveUser = require("../models/saveUser");
const errorHandler = require("../utils/errorHandler");
const keys = require('../config/keys');
const db = require('../helpers/database')

module.exports.saveUser = async (req, res) => {
    
const user = new SaveUser({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
    city: req.body.city,
    address: req.body.address
  });
  console.log('asd')
  try {
    await user.save();
    res.status(201).json(user);
  } catch (e) {
    errorHandler(res, e);
  }
};