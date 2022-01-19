const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupMember = new Schema({
    idGR: { type: String, requried:true },
    username: { type: String, requried:true },
    imgGR: { type: String, requried:true },
},{
    timestamps: true,
});

module.exports = mongoose.model('GroupMember', GroupMember);