const mongoose = require('mongoose');

const Withdrawal_lock = new mongoose.Schema({
    investorId: {
        type: Number,
        unique: true,
    },
    count: {
        type: Number,
        default: 0,
    },
    ip_address: {
        type: String
    },
}, {
    timestamps: true,
    collection: 'Withdrawal_lock'
});
module.exports = mongoose.model("Withdrawal_lock", Withdrawal_lock);