const models = require('../../../models');
const colorConsole = require('../../../lib/console');

exports.createAnswer = async (req, res) => {
  colorConsole.gray("createAnswer API CALL");
  const { answer, questionId } = req.body;
  const { userData } = req.decoded;

  if(!answer) {
    const result = {
      status: 400,
      message: '답변 내용을 입력하세요.'
    }

    res.status(400).json(result);

    return;
  }

  try {
    await models.Answer.createAnswer(questionId, answer, userData.id);

    const result = {
      status: 200,
      message: '답변 저장 성공!'
    }

    res.status(200).json(result);
  } catch(error) {
    colorConsole.red(error);

    const result = {
      status: 500,
      message: '서버 에러!'
    }

    res.status(500).json(result);
  }
}


exports.modifyAnswer = async (req, res) => {
  colorConsole.gray("modifyAnswer API CALL");
  const { answer, id } = req.body;
  const { userData } = req.decoded;

  if(!answer) {
    const result = {
      status: 400,
      message: '답변 내용을 입력하세요.'
    }

    res.status(400).json(result);

    return;
  }

  try {
    // const answerRight = await models.Answer.checkRight(id, userData.id); 

    // if(!answerRight)
    // {
    //   const result = {
    //     status: 403,
    //     message: '답변 수정 권한 없음!',
    //   }
  
    //   res.status(403).json(result);

    //   return;
    // }

    await models.Answer.modifyAnswer(id, answer, userData.id);

      const result = {
        status: 200,
        message: '답변 수정 성공!'
      }
  
      res.status(200).json(result);
  } catch(error) {
    colorConsole.red(error);

    const result = {
      status: 500,
      message: '서버 에러!'
    }

    res.status(500).json(result);
  }
}


exports.deleteAnswer = async (req, res) => {
  colorConsole.gray("deleteAnswer API CALL");
  const { id } = req.query;
  const { userData } = req.decoded;

  try {
    if(userData.auth === 0) {

      await models.Answer.deleteAnswer(id);
      await models.Comment.deleteAnswerCommentAll(id);

      const result = {
        status: 200,
        message: '답변 삭제 성공! (관리자 권한)',
      }
  
      res.status(200).json(result);

      return;
    }

    const answerRight = await models.Answer.checkRight(id, userData.id); 

    if(!answerRight)
    {
      const result = {
        status: 403,
        message: '답변 삭제 권한 없음!',
      }
  
      res.status(403).json(result);

      return;
    }

    await models.Answer.deleteAnswer(id);
    await models.Comment.deleteAnswerCommentAll(id);

    const result = {
      status: 200,
      message: '답변 삭제 성공!'
    }

    res.status(200).json(result);
  } catch(error) {
    colorConsole.red(error);

    const result = {
      status: 500,
      message: '서버 에러!'
    }

    res.status(500).json(result);
  }
}
//수정 예정
exports.isRightAuth = async (req, res) => {
  const { answerId } = req.body;
  const { userData } = req.decoded;
  
  try {
    const answerRight = await models.Answer.checkRight(answerId, userData.id); 

    if(!answerRight)
    {
      const result = {
        status: 403,
        message: '답변 수정 || 삭제 권한 없음!',
      }
  
      res.status(403).json(result);
    } 

    const result = {
      status: 200,
      message: '답변 수정 || 삭제 가능!',
    }

    res.status(200).json(result);

  } catch(error) {
    const result = {
      status: 500,
      message: '서버 에러!',
    }

    res.status(500).json(result);
  }
}