const mongoose = require("mongoose");
const vip_hisory = new mongoose.Schema({
    id: { type: Number },
    investorId: { type: Number },
    random_id: { type: Number },
    trx_amt: { type: Number },
    invest_type: { type: String },
    vip: { type: String },
    expiry_date: { type: Date },
    status: { type: Number, default :0},
    income_date: { type: Date, default: Date.now },
}, { timestamps: true, collection: 'VipHistory' })
module.exports = mongoose.model('VipHistory', vip_hisory);
