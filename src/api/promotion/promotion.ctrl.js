const colorConsole = require('../../lib/console');
const models = require('../../models')
const file = require('../../lib/file');

async function createIdentifyId () {
  const postData = await models.Team.getNewPostId();
  let identifyId;
  
  if(postData[0][0] == null || postData[0][0] == undefined) {
     identifyId = 0;
  } else {
     identifyId = postData[0][0].id;
  }

  return identifyId;
}


exports.writeTeamPromotion = async (req, res) => {
  const { teamName, userName, contents, email, title } = req.body;
  console.log(req.body);
  
  try {
    if(!req.files[0]) {
      console.log("test");
      
      const identifyId = await createIdentifyId();
      await models.Team.createTeamPost(teamName, userName, title, contents, email, identifyId);

      const result = {
        status: 200,
        message: "팀 홍보 게시물 작성 성공!",
      }
  
      res.status(200).json(result);

      return;
    }
    else {

     const identifyId = await createIdentifyId();

      for(let i = 0; i < req.files.length; i++) {
        await models.File.createFile(identifyId, req.files[i].filename, contentsId);
      }

      await models.Team.createTeamPost(teamName, userName, title, contents, email, identifyId);

      const result = {
        status: 200,
        message: "팀 홍보 게시물 작성 성공!",
      }
  
      res.status(200).json(result);
      
      return;
    }
  } catch(error) {
    colorConsole.red(error);

    file.deleteUploadFiles(req.files);

    const result = {
      status: 500,
      message: "서버 에러!",
    }

    res.status(500).json(result);
  }
}