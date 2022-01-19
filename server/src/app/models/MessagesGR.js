const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageGR = new Schema({
    idGroup: { type: String, requried:true },
    username: { type: String, maxLength: 50, requried:true },
    message: { type: String, requried:true },
    photoURL: {type:String}
},{
    timestamps: true,
});

module.exports = mongoose.model('MessageGR', MessageGR);