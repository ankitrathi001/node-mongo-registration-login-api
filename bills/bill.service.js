const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;
const Bill = db.Bill;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll(userHash) {
    return await Bill.find({userHash: userHash}).select('-userHash').select('-billHash');
}

async function getById(id) {
    return await Bill.findById(id).select('-userHash').select('-billHash');
}

async function create(billParam) {

    const bill = new Bill(billParam);

    // hash billName
    if (billParam.billName) {
        bill.billHash = bcrypt.hashSync(billParam.billName, 5);
    }

    // save user
    await bill.save();
}

async function update(id, billParam) {
    const bill = await Bill.findById(id);

    // validate
    if (!bill) throw 'Bill not found';

    // hash password if it was entered
    if (billParam.billName) {
        billParam.billHash = bcrypt.hashSync(billParam.billName, 5);
    }

    // copy userParam properties to user
    Object.assign(bill, billParam);

    await bill.save();
}

async function _delete(id) {
    await Bill.findByIdAndRemove(id);
}