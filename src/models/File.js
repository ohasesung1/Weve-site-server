module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define('file' ,{
    fileName: {
      field: 'file_name',
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    identifyId: {
      field: 'identify_id',
      type: DataTypes.INTEGER(100),
      allowNull: false,
    },
    contentId: {
      field: 'content_id',
      type: DataTypes.INTEGER(5),
      allowNull: false,
    },
    date: {
      field: 'date',
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'file',
    timestamps: false,
  });

  File.createFile = (identifyId, fileName, contentId) => File.create({
    identifyId: identifyId,
    fileName: fileName,
    contentId: contentId
  });

  File.getContentsFile = (fileId, contenstId) => File.findAll({
    attributes: ['id', 'fileName', 'identifyId', 'date'],
    where: {
      identifyId: fileId,
      contentId: contenstId
    }
  });

  File.getFile = (id) => File.findOne({
    attributes: ['fileName'],
    where: {
      id: id
    }
  });

  File.getFiles = (identifyId) => File.findAll({
    attributes: ['fileName'],
    where: {
      identifyId: identifyId
    }
  });

  File.updateFile = (fileId, filename) => File.update({
    fileName: filename,
  },{
    where: {
     id: fileId, 
    }
  });

  File.deleteFile = (fileId) => File.destroy({
    where: {
      id: fileId
    }
  });

  File.deleteFiles = (identifyId, contentId) => File.destroy({
    where: {
      identifyId: identifyId,
      contentId: contentId
    }
  });

  return File;
}