const mongoose = require('mongoose');

const withdrawlhistorySchema = new mongoose.Schema({    
     investorId : { type: Number },
     random_id : { type: Number },
     total_amount : { type: Number },      
     reinvest_amount : {type: Number },   
     withdrawal_amount : { type : Number },
     ip_address : { type : String },
     withdrawal_type : { type : String },
     block_timestamp : { type : Number },
     transaction_id : { type : String},
     payout_status : { type : Number, default : 0 }, 
     reinvestment_status : { type : Number, default : 0 }   
}, { timestamps: true});

module.exports = mongoose.model("Withdrawlhistory", withdrawlhistorySchema);