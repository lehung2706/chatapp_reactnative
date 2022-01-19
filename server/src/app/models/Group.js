const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Group = new Schema({
    nameGR: { type: String, requried:true },
    img: { type: String, requried:true },
    lastUser : { type: String, default:"" },
    lastMessage : { type: String, default:"" },
},{
    timestamps: true,
});

module.exports = mongoose.model('Group', Group);