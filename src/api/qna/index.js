const qna = require('express').Router();
const qnaCtrl = require('./qna.ctrl.js');
const comment = require('./comment');
const answer = require('./answer');
const middleWareAuth = require('../../middleWare/auth');

qna.post('/', middleWareAuth, qnaCtrl.createQuestion);
qna.get('/', qnaCtrl.QuestionList);
qna.delete('/', middleWareAuth,qnaCtrl.questionRemove);
qna.put('/', middleWareAuth,qnaCtrl.questionUpdate);
qna.post('/isRight', middleWareAuth, qnaCtrl.isRightAuth);

qna.use('/comment', middleWareAuth, comment);
qna.use('/answer',middleWareAuth, answer);

module.exports = qna;