const models = require('../models');
const fs = require('fs');

exports.removeDbFiles = async (identifyId) => {
  const fileData = await models.File.getFiles(identifyId);
  
  for(let i = 0; i < fileData.length; i++) {
    const filename = fileData[i].dataValues.fileName;
    if(filename === null) {
      return;
    }
    fs.unlinkSync(`./public/${filename}`);
  }
}

exports.updateDbFiles = async (fileId) => {
  const fileData = await models.File.getFile(fileId);
  const filename = fileData.dataValues.fileName;
  
    if(filename === null) {
      return;
    }
  
  fs.unlinkSync(`./public/${filename}`);
}

exports.deleteUploadFile = async (fileId) => {  
  const fileData = await models.File.getFile(fileId);
  
  filename = fileData.dataValues.fileName;
  fs.unlinkSync(`./public/${filename}`);
}

exports.deleteUploadFiles = async (files) => {
  for(let i = 0; i < files.length; i++) {
    fs.unlinkSync(`./public/${files[i].filename}`);
  }
}