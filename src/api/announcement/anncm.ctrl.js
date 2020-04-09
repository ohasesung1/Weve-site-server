const models = require('../../models');
const colorConsole = require('../../lib/console');
const file = require('../../lib/file');

 async function createIdentifyId()  {
  let anncmData = await models.Anncm.getNewAnncmId();
  let identifyId;
  // console.log(anncmData);
  
  if(anncmData[0][0] == null || anncmData[0][0] == undefined) {
    identifyId = 0;
  } else {
    identifyId = anncmData[0][0].id;
  }

  return identifyId;
}


exports.createAnncm = async (req, res) => {
  colorConsole.gray("createAnncm API CALL");
  const { teamName, title, description, grade, field, personnel, userName, email } = req.body;
  const { userData } = req.decoded;
  const contentsId = 2;
  
  try {
    if(!req.files[0] || req.files[0] == undefined) {
      
      identifyId = await createIdentifyId();
      
      await models.Anncm.createAnncm(teamName, title, description, email, grade, field, userData.id, personnel,userName, identifyId);
    }
    else {
      
      identifyId = await createIdentifyId();
      
      for (let i = 0; i < req.files.length; i++) {
        await models.File.createFile(identifyId, req.files[i].filename, contentsId);
      }

      await models.Anncm.createAnncm(teamName, title, description, email, grade, field, userData.id, personnel, userName, identifyId);
    }

    const result = {
      status: 200,
      message: '채용공고 작성 완료!'
    };

    res.status(200).json(result);

  } catch(error) {
    colorConsole.red(error);

    file.deleteUploadFiles(req.files);

    const result = {
      status: 500,
      message: '서버 에러!'
    };

    res.status(500).json(result);
  }
}


exports.getAnncm = async (req, res) => {
  colorConsole.gray("getAnncm API CALL");
  const { id } = req.query;
  const contentsId = 2;

  try {  
    if(!id) {

      const anncmList = await models.Anncm.getAnncmList();
      
      const result = {
        status: 200,
        message: '채용공고 리스트 불러오기 완료!',
        data: {
          anncmList
        }
      };
  
      res.status(200).json(result);

      return;
    }
    
    const anncm = await models.Anncm.getAnncm(id);
    identifyId = anncm.identifyId;

    const filename = await models.File.getContentsFile(identifyId, contentsId);

    const result = {
      status: 200,
      message: '채용공고 불러오기 완료!',
      data: {
        anncm,
        filename
      }
    };

    res.status(200).json(result);

  } catch(error) {
    colorConsole.red(error);

    const result = {
      status: 500,
      message: '서버 에러!'
    };

    res.status(500).json(result);
  }
}

exports.modifyAnncm = async (req, res) => {
  colorConsole.gray("modifyAnncm API CALL");
  const { id, teamName, description, title, grade, personnel, field, fileId, identifyId, userName, email } = req.body;
  // const { userData } = req.decoded;
  const contentsId = 2;
  
  try {

    if(!fileId && title && description) {
      
      await models.Anncm.modifyAnncm(id,teamName, title, description, grade, personnel, field, email, userName);

      const result = {
        status: 200,
        message: '채용공고 수정 성공! file == null',
      };
  
      res.status(200).json(result);

      return;
    }
    else if(identifyId) {  
      
      for(let i = 0; i < req.files.length; i++) {
        await models.File.createFile(identifyId, req.files[i].filename, contentsId);
      }

      const result = {
        status: 200,
        message: '채용공고 수정 성공! file 추가',
      };
  
      res.status(200).json(result);

      return;
    }
    if(fileId && !req.files[0]) {
      
      await file.deleteUploadFile(fileId);
      await models.File.deleteFile(fileId);

      const result = {
        status: 200,
        message: '채용공고 수정 성공! file 삭제',
      };
  
      res.status(200).json(result);

      return;
    }
    else {
      await file.deleteUploadFile(fileId);
      await models.Anncm.modifyAnncm(id,teamName, title, description, grade, personnel, field, email, userName);
      await models.File.updateFile(fileId, req.files[0].filename);

      const result = {
        status: 200,
        message: '채용공고 수정 성공!',
      };
  
      res.status(200).json(result);
    }

  } catch(error) {
    colorConsole.red(error);

    file.deleteUploadFiles(req.files);

    const result = {
      status: 500,
      message: '서버 에러!'
    };

    res.status(500).json(result);
  }
}

exports.deleteAnncm = async (req, res) => {
  colorConsole.gray("deleteAnncm API CALL");
  const { id } = req.query;
  const { userData } = req.decoded;
  const contentsId = 2;
  let anncmData = await models.Anncm.getAnncm(id);
  identifyId = anncmData.dataValues.identifyId;

  if(userData.auth === 0) {
      
    await file.removeDbFiles(identifyId);
    await models.File.deleteFiles(identifyId, contentsId);
    await models.Anncm.deleteAnncm(id);

    const result = {
      status: 200,
      message: '채용공고 삭제 성공! (관리자 권한)',
    }

    res.status(200).json(result);

    return;
  }

  const anncmRight = await models.Anncm.checkRight(id, userData.id); 

  if(!anncmRight)
  {
    const result = {
      status: 403,
      message: '채용공고 삭제 권한 없음!',
    }

    res.status(403).json(result);

    return;
  }

  try {  

    await file.removeDbFiles(identifyId);
    await models.File.deleteFiles(identifyId, contentsId);
    await models.Anncm.deleteAnncm(id);

    const result = {
      status: 200,
      message: '채용공고 삭제 완료!',
    };

    res.status(200).json(result);

  } catch(error) {
    colorConsole.red(error);

    const result = {
      status: 403,
      message: '채용공고 삭제 권한 없음!',
    };

    res.status(500).json(result);
  }
}