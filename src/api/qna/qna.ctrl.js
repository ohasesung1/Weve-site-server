const models = require('../../models');
const colorConsole = require('../../lib/console');

exports.createQuestion = async (req, res) => {
  colorConsole.gray("createQuestion API CALL");
  
  const {question, title, tag} = req.body;
  const { userData } = req.decoded;
  
  if(!title) {
    const result = {
      status: 400,
      message: '제목을 입력하세요.'
    }

    res.status(400).json(result);

    return;
  }

  if(!question) {
    const result = {
      status: 400,
      message: '질문을 입력하세요.'
    }

    res.status(400).json(result);

    return;
  }

  try {
    await models.Question.createQ(title, question, tag, userData.id);

    const result = {
      status: 200,
      message: '질문 작성 성공!'
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

exports.QuestionList = async (req, res) => {
  colorConsole.gray("QuestionList API CALL");
  
  const { id, answerId } = req.query;

  try {
    if(!id) {
      const question = await models.Question.QuestionList();

      const result = {
        status: 200,
        message: '질문 리스트 불러오기 성공!',
        data: {
          question,
        }
      }
  
      res.status(200).json(result);
    } 
    else if (!answerId){
      const question = await models.Question.getQuestion(id);
      const answer = await models.Answer.findAnswer(id);

      const result = {
        status: 200,
        message: '질문, 답변 불러오기 성공!',
        data: {
          question,
          answer
        }
      }
  
      res.status(200).json(result);
    }
    else {
      const comment = await models.Comment.getComment(answerId);

      const result = {
        status: 200,
        message: '댓글 불러오기 성공!',
        data: {
          comment
        }
      }
  
      res.status(200).json(result);
    }
  } catch(error) {
    colorConsole.red(error);

    const result = {
      status: 500,
      message: '서버 에러!'
    }

    res.status(500).json(result);
  }
}

exports.questionRemove = async (req, res) => {
  colorConsole.gray("questionRemove API CALL");
  
  const { id } = req.query;
  const { userData } = req.decoded; 
  
  try {
    if(userData.auth === 0) {
      
      await models.Question.questionRemove(id);
      await models.Answer.deleteAnswerAll(id);
      await models.Comment.deleteCommentAll(id);

      const result = {
        status: 200,
        message: '질문 삭제 성공! (관리자 권한)',
      }
  
      res.status(200).json(result);

      return;
    }
    const questionRight = await models.Question.checkRight(id, userData.id); 

    if(!questionRight)
    {
      const result = {
        status: 403,
        message: '질문 삭제 권한 없음!',
      }
  
      res.status(403).json(result);

      return;
    }

    await models.Question.questionRemove(id);
    await models.Answer.deleteAnswerAll(id);
    await models.Comment.deleteCommentAll(id);

    const result = {
      status: 200,
      message: '질문 삭제 성공!',
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

exports.questionUpdate = async (req, res) => {
  colorConsole.gray("questionUpdate API CALL");
  
  const { question, title, id, tag } = req.body; 
  // const { userData } = req.decoded;

  if(!question) {
    const result = {
      status: 400,
      message: '질문 내용을 입력하세요!',
    }

    res.status(400).json(result);

    return;
  }

  if(!title) {
    const result = {
      status: 400,
      message: '질문 제목을 입력하세요!',
    }

    res.status(400).json(result);

    return;
  }

  try {
    // const questionRight = await models.Question.checkRight(id, userData.id); 

    // if(!questionRight)
    // {
    //   const result = {
    //     status: 403,
    //     message: '질문 수정 권한 없음!',
    //   }
  
    //   res.status(403).json(result);

    //   return;
    // }   

    await models.Question.questionUpdate(id, title, question, tag);

    const result = {
      status: 200,
      message: '질문 수정 성공!',
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
  const { questionId } = req.body;
  const { userData } = req.decoded;
  
  try {
    const questionRight = await models.Question.checkRight(questionId, userData.id); 

    if(!questionRight)
    {
      const result = {
        status: 403,
        message: '질문 수정 || 삭제 권한 없음!',
      }
  
      res.status(403).json(result);
    } 

    const result = {
      status: 200,
      message: '질문 수정 || 삭제 가능!',
    }

    res.status(200).json(result);

  } catch(error) {
    colorConsole.red(error);
    const result = {
      status: 500,
      message: '서버 에러!',
    }

    res.status(500).json(result);
  }
}