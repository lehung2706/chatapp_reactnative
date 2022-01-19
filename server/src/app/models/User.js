const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    username: { type: String, requried:true },
    fullname: { type: String, maxLength: 50, requried:true },
    phone: { type: String, maxLength: 50, requried:true },
    password: { type: String, minLength:6, maxLength: 16, requried:true },
    photoURL: {type:String}
},{
    timestamps: true,
});

module.exports = mongoose.model('User', User);