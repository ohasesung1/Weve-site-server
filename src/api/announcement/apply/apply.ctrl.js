const models = require('../../../models');
const colorConsole = require('../../../lib/console');

exports.applyAnncm = async (req, res) => {
  const { anncmId, grade, userName, email } = req.body;
  const { userData } = req.decoded;

  try{
    console.log("sett");
    console.log(anncmId);
    
    const checkApply = await models.AnncmApplyList.checkApply(anncmId, userData.id);
    console.log("test");
    
    if(checkApply) {
      const result = {
        status: 400,
        message: "이미 신청을 보낸 회원 입니다."
      }

      res.status(400).json(result);

      return;
    }
    const anncmData = await models.Anncm.getAnncm(anncmId);
    teamName = anncmData.dataValues.teamName;
    console.log(teamName);
    
    await models.AnncmApplyList.Apply(anncmId, teamName, grade, userName, email, userData.id);

    const result = {
      status: 200,
      message: "신청 성공!"
    }

    res.status(200).json(result);
  } catch(error) {
    colorConsole.red(error);

    const result = {
      status: 500,
      message: "서버 에러!"
    }

    res.status(500).json(result);
  }
}
