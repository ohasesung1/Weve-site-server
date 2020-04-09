const tokenLib = require('../../lib/token');
const colorConsole = require('../../lib/console');
const models = require('../../models');
const validate = require('../../lib/validation');
const verifier = require('email-verify');

exports.check = async (req, res) => {
  const { id, pw } = req.body;
  
  if(!id) {
    const result = {
      status: 400,
      message: 'id를 입력해주세요!',
    }

    res.status(400).json(result);

    return;
  }
    if(!pw) {
      const result = {
        status: 400,
        message: 'pw를 입력해주세요!',
      }
  
      res.status(400).json(result);
  
      return;
    }

  try {

    const member = await models.Member.findMemberForLogin(id, pw);

    if(!member) {
        const result = {
          status: 403,
          message: 'id || pw를 확인 해주세요!',
        }
    
        res.status(403).json(result);
    
        return;
    }

    const token_data = await tokenLib.issuedToken(member.id, member);

    const result = {
      status: 200,
      message: '로그인 성공!',
      data: {
        token_data,
        member
      },
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

exports.register_account = async (req, res) => {
  const { body } = req;
  
  try {
    await validate.validateRegisterUser(body);
  } catch(error) {
    colorConsole.red(error);
    
    const result = {
      status: 400,
      message: "회원가입 양식을 확인 해주세요!",
    }

    res.status(400).json(result);

    return;
  }

  try {
    const promise = new Promise(async (resolve, reject) => {
      await verifier.verify(body.email, (error, info) => {
        resolve(info.success);
      });
    });

    verify_email = await promise;

    if(verify_email === false) {
      const result = {
        status: 400,
        message: "유효하지 않은 이메일 입니다!",
      }    
  
      res.status(400).json(result);

      return;
    }

    const memberId = await models.Member.findMemberId(body.id);
    
    if(memberId) {
      const result = {
        status: 409,
        message: "이미 가입된 아이디 입니다!",
      }
  
      res.status(409).json(result);

      return;
    }

    await models.Member.registerMember(body.id, body.pw, body.display_name, body.email, 1, body.profile_image);

    const result = {
      status: 200,
      message: "회원가입 성공!",
    }

    res.status(200).json(result);

  } catch(error) {
    colorConsole.red(error);

    const result = {
      status: 500,
      message: "서버 에러!",
    }

    res.status(500).json(result);
  }
}