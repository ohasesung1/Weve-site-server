const api = require('express').Router();
const login = require('./auth');
const notice = require('./notice');
const qna = require('./qna');
const anncm = require('./announcement');
const member = require('./member');
const promotion = require('./promotion');

api.use('/auth', login);
api.use('/notice', notice);
api.use('/qna', qna);
api.use('/anncm', anncm);
api.use('/member', member);
api.use('/promotion', promotion);

module.exports = api;