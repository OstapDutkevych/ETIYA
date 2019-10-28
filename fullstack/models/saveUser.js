const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const saveUser = new Schema({
        id: {
                type: Number
        },
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        userName : {
            type: String
        },
        phone : {
            type: Number
        },
        email: {
                type: String,
                required: true,
                unique: true
        },
        password: {
                type: String,
                required: true
        },
        city :{
            type: String
        },
        address : {
            type: String
        }
})

module.exports = mongoose.model('saveUser', saveUser);