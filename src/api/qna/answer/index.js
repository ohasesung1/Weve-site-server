const answer = require('express').Router();
const answerCtrl = require('./answer.ctrl');

answer.post('/', answerCtrl.createAnswer);
answer.post('/isRight', answerCtrl.isRightAuth);
answer.put('/', answerCtrl.modifyAnswer);
answer.delete('/', answerCtrl.deleteAnswer);

module.exports = answer;