const jwt = require("jsonwebtoken");

const User = require("../models/user");
const keys = require("../config/keys");
const errorHandler = require("../utils/errorHandler");

module.exports.loginUser = async (req, res) => {
  const candidate = await User.findOne({ email: req.body.email });

  if (candidate) {
    if (candidate.password == req.body.password) {
      //generate token
      const token = jwt.sign(
        {
          email: candidate.email,
          userId: candidate._id
        },
        keys.jwt,
        { expiresIn: 60 * 60 }
      );
      res.status(200).json({
        token: `Baerer ${token}`,
        ...req.body

      });
    } else {
      res.status(401).json({ message: "Password wrong ! Please try again" });
    }
  } else {
    res.status(404).json({
      message: "User not found"
    });
  }
};

module.exports.registerUser = async (req, res) => {
  const candidate = await User.findOne({ email: req.body.email });

  if (candidate) {
    res.status(409).json({
      message: "E-mail is existing"
    });
  } else {
    const user = new User({
      email: req.body.email,
      password: req.body.password
    });
    try {
      await user.save();
      res.status(201).json(user);
    } catch (e) {
      errorHandler(res, e);
    }
  }
};
