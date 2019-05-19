const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    billHash: { type: String, unique: true, required: true },
    userHash: { type: String, required: true },
    billName: { type: String, required: true },
    billOwner: {type: String, required: true},
    billAmount: {type: String, required: true},
    billingFrequency: { type: String, required: true },
    billRegisteredDate: { type: Date, default: Date.now },
    billDueDate: {type: Date, default: Date.now}
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Bill', schema);