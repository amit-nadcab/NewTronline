const mongoose = require('mongoose')


const transactionSchema = new mongoose.Schema({
    investorId: { type: Number },
    random_id: { type: Number },
    income_from_random_id: { type: Number },
    income_from_id: { type: Number },
    transaction_id: { type: String },
    wallet_address: { type: String },
    total_income: { type: Number, required: true },
    income_date: { type: Date, default: Date.now },
    level: { type: Number, default: 0 },
    status: { type: Number, default: 0 },
    income_type: { type: String },
    invest_type: { type: String },
}, { timestamps: true })

module.exports = mongoose.model("Transaction", transactionSchema)