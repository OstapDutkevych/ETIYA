const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
        id: {
                type: Number
        },
        firsName: {
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
        }
})

module.exports = mongoose.model('UserCreate', userSchema);