const express = require('express');
const router = express.Router();
const billService = require('./bill.service');
const userService = require('../users/user.service');

// routes
router.post('/register', register);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function register(req, res, next) {
    req.body.userHash = req.user.sub;
    billService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    billService.getAll(req.user.sub)
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getById(req, res, next) {
    billService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    billService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    billService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}
