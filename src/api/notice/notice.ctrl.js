const models = require('../../models');
const file = require('../../lib/file');
const colorConsole = require('../../lib/console');

async function createIdentifyId() {
  let noticeData = await models.Notice.getNewNoticeId();
  let identifyId;
  
  if(noticeData[0][0] == null || noticeData[0][0] == undefined) {
     identifyId = 0;
  } else {
     identifyId = noticeData[0][0].id;
  }

  return identifyId;
}

exports.createNotice = async (req, res) => {
  colorConsole.gray("createNotice API CALL");
  
  const { title, description } = req.body;
  const { userData } = req.decoded;
  const contentsId = 1;

  if(!title){
    const result = {
      status: 400,
      message: '제목을 입력하세요.'
    }

    file.deleteUploadFiles(req.files);

    res.status(400).json(result);

    return;
  }

  if(!description) {

    const result = {
      status: 400,
      message: '내용을 입력하세요.'
    }

    file.deleteUploadFiles(req.files);

    res.status(400).json(result);

    return;
  }
  
  try {
    if(!req.files[0]) {      
      
      identifyId = await createIdentifyId();
      await models.Notice.createNotice(title, description, identifyId, userData.id, userData.name);
    } 
    else {
      identifyId = await createIdentifyId();

      for(let i = 0; i < req.files.length; i++) {
        await models.File.createFile(identifyId, req.files[i].filename, contentsId);
      }
      
      await models.Notice.createNotice(title, description, identifyId, userData.id, userData.name);
    }

    const result = {
      status: 200,
      message: '공지사항 작성 성공!'
    };

    res.status(200).json(result);
  } catch(error) {

    file.deleteUploadFiles(req.files);

    const result = {
      status: 500,       
      message: '서버 에러!'
    };

    colorConsole.red(error);
    
    res.status(500).json(result);
  }
}

exports.getNoticeList = async (req, res) => {
  colorConsole.gray("getNoticeList API CALL");
  
  const  { id } = req.query;
  const contentsId = 1;

  try {
    if(!id) {
    const noticeList = await models.Notice.getNoticeList();
      
    const result = {
      status: 200,
      message: '공지사항 리스트 불러오기 성공!',
      data: {
        noticeList
      }
    };

    res.status(200).json(result);
    }
    else {
      const notice = await models.Notice.getNotice(id);
      
      let identifyId = notice.identifyId;

      const files = await models.File.getContentsFile(identifyId, contentsId);
      
      const result = {
        status: 200,
        message: '공지사항 불러오기 성공!',
        data:{
          notice,
          files
        }
      };
  
      res.status(200).json(result);
    }
   

  } catch(error) {
    colorConsole.red(error);

    const result = {
      status: 500,
      message: '서버 에러!'
    };

    res.status(500).json(result);
  }
}

exports.deleteNotice = async (req, res) => {
  colorConsole.gray("deleteNotice API CALL");
  
  const { id } = req.query;  
  const { userData } = req.decoded;
  const contentsId = 1;

  const noticeRight = await models.Notice.checkRight(id, userData.id); 

  if(!noticeRight) {
    const result = {
      status: 403,
      message: '공지사항 삭제 권한 없음!',
    }

    res.status(403).json(result);

    return;
  }

  try {
    let noticeData = await models.Notice.getNotice(id);
    identifyId = noticeData.dataValues.identifyId;
    
    await models.Notice.deleteNotice(id);
    await file.removeDbFiles(identifyId);
    await models.File.deleteFiles(identifyId, contentsId);

    const result = {
      status: 200,
      message: '공지사항 삭제 성공!',
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

exports.updateNotice = async (req, res) => {
  colorConsole.gray("updateNotice API CALL");
  const { title, description, id, fileId, identifyId } = req.body;
  const contentsId = 1;

  try {
    if(!fileId && title && description) {
      
      await models.Notice.updateNotice(id, title, description);

      const result = {
        status: 200,
        message: '공지사항 수정 성공! file == null',
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
        message: '공지사항 수정 성공! file 추가',
      };
  
      res.status(200).json(result);

      return;
    } 
    if(fileId && !req.files[0]) {
      await file.deleteUploadFile(fileId);
      await models.File.deleteFile(fileId);

      const result = {
        status: 200,
        message: '공지사항 수정 성공! file 삭제',
      };
  
      res.status(200).json(result);

      return;
    }
    else {
      await file.deleteUploadFile(fileId);
      await models.Notice.updateNotice(id, title, description);
      await models.File.updateFile(fileId, req.files[0].filename);

      const result = {
        status: 200,
        message: '공지사항 수정 성공!',
      };
  
      res.status(200).json(result);
    }

  } catch(error) {
    
    file.deleteUploadFiles(req.files);

    colorConsole.red(error);

    const result = {
      status: 500,
      message: '서버 에러!'
    };

    res.status(500).json(result);
  }
}
//수정 예정
exports.isRightAuth = async (req, res) => {
  const { noticeId } = req.body;
  const { userData } = req.decoded;

  if(userData.auth == 3 || userData.auth == 1) {
    if(userData.auth === 1 || userData.auth === 3) {
      const result = {
        status: 403,
        message: '공지사항 작성 권한 없음!'
      };
  
      res.status(403).json(result);
  
      return;
    }
  }

  try {
    const noticeRight = await models.Notice.checkRight(noticeId, userData.id); 

    if(!noticeRight)
    {
      const result = {
        status: 403,
        message: '공지사항 수정 || 삭제 권한 없음!',
      }
  
      res.status(403).json(result);
  
      return;
    }

    const result = {
      status: 200,
      message: '공지사항 삭제 || 수정 가능!',
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