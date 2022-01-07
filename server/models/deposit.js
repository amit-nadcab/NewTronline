const mongoose = require("mongoose");
const deposit = new mongoose.Schema({
    id: { type: Number },
    investor: { type: String },
    referrerId: { type: Number },
    promoterId: { type: Number },
    amount: { type: Number },
    block_number: { type: Number },
    investorId: { type: Number },
    _type: { type: Number },
    block_timestamp: { type: String },
    waddress: { type: String },
    transaction_id: { type: String, unique : true},
    is_member_count: { type: Number },
    up_level_paid_status: { type: Number, default :0},
    paid_status: { type: Number,default : 1 },
    trx_amt: { type: Number },
    invest_type: { type: String },
    sponsor_level_paid: { type: Number, default: 0 },
    up_level_paid: { type: Number, default :0},
    down_level_paid: { type: Number ,default :0},
    vip_income_paid: { type: Number ,default :0},
}, { timestamps: true, collection: 'Deposit' })
module.exports = mongoose.model('Deposit', deposit);
