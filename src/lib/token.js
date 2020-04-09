require('dotenv').config();

const jwt = require('jsonwebtoken');
const {JWT_SECRET : jwt_secret} = process.env; 

exports.issuedToken = async (userId, userData) => {
  const option = {
    expiresIn: '60 days',
    subject: 'token',
  }

  try{
    return jwt.sign({ userId, userData }, jwt_secret, option);
  } catch(error) {
    throw error;
  }
}

exports.refreshToken = async (userId, userData) => {
  const option = {
    expiresIn: '60 days',
  }

  try{
    return jwt.sign({ userId, userData }, jwt_secret, option);
  } catch(error) {
    throw error;
  }
}

exports.verifyToken = async (token) => {
  try{
    return jwt.verify(token, jwt_secret);
  } catch(error) {
    throw error
  }
}