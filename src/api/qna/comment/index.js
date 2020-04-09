const comment = require('express').Router();
const commentCtrl = require('./comment.ctrl');

comment.post('/', commentCtrl.writeComment);
comment.post('/isRight', commentCtrl.isRightAuth);
comment.delete('/', commentCtrl.deleteComment);
comment.put('/', commentCtrl.modifyComment);

module.exports = comment;