const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    avatar:{
        type: String
    },
    date: {
        type: Date,
        defaul: Date.now
    }
});
// collection name in mongodb will be is users
module.exports = User = mongoose.model("user", UserSchema);