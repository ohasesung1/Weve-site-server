const models = require('../../../models');
const colorConsole = require('../../../lib/console');

exports.writeComment = async (req, res) => {
  colorConsole.gray("writeComment API CALL");
  const { comment, answerId, questionId } = req.body; 
  const { userData } = req.decoded;

  if(!comment) {
    const result = {
      status: 400,
      message: '댓글 내용을 입력하세요!',
    }

    res.status(400).json(result);

    return;
  }
  
  try {
    await models.Comment.writingComment(answerId, questionId, comment, userData.id);

    const result ={
      status: 200,
      message: '댓글 작성 성공!',
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

exports.deleteComment = async (req, res) => {
  colorConsole.gray("deleteComment API CALL");
  const { id } = req.query ;
  const { userData } = req.decoded;
  
  try {
    if(userData.auth === 0) {
      
      await models.Comment.deleteComment(id);

      const result = {
        status: 200,
        message: '댓글 삭제 성공! (관리자 권한)',
      }
  
      res.status(200).json(result);

      return;
    }

    const commentRight = await models.Comment.checkRight(id, userData.id); 

    if(!commentRight)
    {
      const result = {
        status: 403,
        message: '댓글 삭제 권한 없음!',
      }
  
      res.status(403).json(result);

      return;
    }

    await models.Comment.deleteComment(id);

    const result = {
      status: 200,
      message: '댓글 삭제 성공!',
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

exports.modifyComment = async (req, res) => {
  colorConsole.gray("modifyComment API CALL");
  const { comment, id }= req.body;
  // const { userData } = req.decoded;
  
  if(!comment) {
    const result = {
      status: 400,
      message: '댓글 내용을 입력하세요!',
    }

    res.status(400).json(result);

    return;
  }

  try {
    // const commentRight = await models.Comment.checkRight(id, userData.id); 

    // if(!commentRight)
    // {
    //   const result = {
    //     status: 403,
    //     message: '댓글 수정 권한 없음!',
    //   }
  
    //   res.status(403).json(result);

    //   return;
    // }

    await models.Comment.modifyComment(id, comment);

    const result = {
      status: 200,
      message: '댓글 수정 성공!',
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
  const { commentId } = req.body;
  const { userData } = req.decoded;
  
  try {
    const commentRight = await models.Comment.checkRight(commentId, userData.id); 

    if(!commentRight)
    {
      const result = {
        status: 403,
        message: '댓글 수정 || 삭제 권한 없음!',
      }
  
      res.status(403).json(result);
    } 

    const result = {
      status: 200,
      message: '댓글 수정 || 삭제 가능!',
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