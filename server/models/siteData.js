const mongoose = require('mongoose');

const siteData = new mongoose.Schema({
  private_key: { type: String},
  contract_address :{ type: String},
}, { timestamps: true, collection: 'siteData' });

module.exports = mongoose.model('siteData', siteData)