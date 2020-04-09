const colorConsole = require('../../lib/console');
const models = require('../../models');

exports.getUserData = (req, res) => {
  const { userData } = req.decoded;

  try {
    const result = {
      status: 200,
      message: '사용자 정보 불러오기 성공!',
      data: {
        userData
      }
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

exports.getUserAnncmList = async (req, res) => {
  const { anncmId } = req.query;
  const { userData } = req.decoded;

  try {
    if(!anncmId) {
      const anncmData = await models.Anncm.getUserAnncm(userData.id);
      
      const result = {
        status: 200,
        message: '작성한 팀 리스트 조회 성공!',
        data: {
          anncmData,
        }
      }

      res.status(200).json(result);

      return;
    }
    const applyData = await models.AnncmApplyList.getApplyList(anncmId);
 
    const result = {
      status: 200,
      message: '팀 신청 리스트 조회 성공!',
      data: {
        applyData
      }
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

exports.getUserApplyList = async (req, res) => {
  const { userData } = req.decoded;
  
  try {

    const teamApplyData = await models.AnncmApplyList.getApplyTeamList(userData.id);

    const result = {
      status: 200,
      message: '내가 신청한 팀이름 조회 성공!',
      data: {
        teamApplyData
      }
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
