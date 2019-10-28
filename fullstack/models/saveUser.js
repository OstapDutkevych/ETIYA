const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
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
            type: String
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
        confirmPassword : {
            type: String,
            required: true
        },
        city :{
            type: String
        },
        country : {
            type: String
        },
        address : {
            type: String
        }
})

module.exports = mongoose.model('saveUser', userSchema);