const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageDR = new Schema({
    idRoom: { type: String, requried:true },
    username: { type: String, maxLength: 50, requried:true },
    message: { type: String, requried:true },
    photoURL: {type:String}
},{
    timestamps: true,
});

module.exports = mongoose.model('MessageDR', MessageDR);