const notice = require('express').Router();
const noticeCtrl = require('./notice.ctrl.js');
const middleWareAuth = require('../../middleWare/auth');
const upload = require('../../lib/upload');

notice.post('/',upload.array('file'), middleWareAuth, noticeCtrl.createNotice);
notice.post('/isRight', middleWareAuth, noticeCtrl.isRightAuth);
notice.get('/', noticeCtrl.getNoticeList);
notice.delete('/',middleWareAuth, noticeCtrl.deleteNotice);  
notice.put('/',upload.array('file'), middleWareAuth, noticeCtrl.updateNotice);

module.exports = notice;