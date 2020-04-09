const auth = require('express').Router();
const authCtrl = require('./auth.ctrl');
const upload = require('../../lib/upload');

auth.post('/login', authCtrl.check);
auth.post('/register',upload.array('image'), authCtrl.register_account);

module.exports = auth;