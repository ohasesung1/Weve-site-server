const member = require('express').Router();
const memberCtrl = require('./member.ctrl');
const middleWareAuth = require('../../middleWare/auth');

member.get('/', middleWareAuth, memberCtrl.getUserData);
member.get('/anncmList', middleWareAuth, memberCtrl.getUserAnncmList);
member.get('/applyList', middleWareAuth, memberCtrl.getUserApplyList);
module.exports = member;