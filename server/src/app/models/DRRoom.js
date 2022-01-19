const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DRRoom = new Schema({
    username1: { type: String, requried:true },
    name1: { type: String, requried:true },
    username2: { type: String, requried:true },
    name2: { type: String, requried:true },
    photoURL1: { type: String, requried:true },
    photoURL2: { type: String, requried:true },
    status:{ type: String, default:'off'},
    lastUser : { type: String, default:"" },
    lastMessage : { type: String, default:"" },

},{
    timestamps: true,
});

module.exports = mongoose.model('DRRoom', DRRoom);