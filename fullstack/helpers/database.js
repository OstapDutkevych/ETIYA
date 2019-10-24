const mongoose = require("mongoose");

const keys = require("../config/keys");

const connect = () =>
  mongoose
    .connect(keys.mongoURI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

module.exports = connect;
