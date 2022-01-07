const mongoose = require('mongoose');

const Setting = new mongoose.Schema({    
    vip_club : { type: Number,default:0 },
    total_vip_club : { type: Number,default:0 },
}, { timestamps: true, collection : 'settings'});
module.exports = mongoose.model("Setting", Setting);