module.exports = (sequelize, DataTypes) => {
  const AnncmApplyList = sequelize.define('anncmApplyList' ,{
    anncmId: {
      field: 'anncmId',
      type: DataTypes.INTEGER(100),
      allowNull: false,
    },
    grade: {
      field: 'grade',
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    userName: {
      field: 'username',
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    teamName: {
      field: 'teamname',
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    userId: {
      field: 'userId',
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    email: {
      field: 'email',
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    date: {
      field: 'date',
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'anncmApplyList',
    timestamps: false,
  });

  AnncmApplyList.Apply = (anncmId,teamName, grade, userName, email, userId) => AnncmApplyList.create({
    anncmId: anncmId,
    teamName: teamName,
    grade: grade,
    userName: userName,
    userId: userId,
    email: email
  });

  AnncmApplyList.cancelApply = (id) => AnncmApplyList.destroy({
    where: {
      id: id,
    }
  });

  AnncmApplyList.getApplyList = (id) => AnncmApplyList.findAll({
    attributes: ['id', 'grade', 'userId', 'userName', 'email', 'date'],
    where: {
      anncmId: id,
    }
  });

  AnncmApplyList.getApplyTeamList = (userId) => AnncmApplyList.findAll({
    attributes: ['teamName'],
    where: {
      userId: userId
    }
  });

  AnncmApplyList.checkApply = (anncmId, userId) => AnncmApplyList.findOne({
    where: {
      anncmId: anncmId,
      userId: userId
    },
    raw: true
  });

  AnncmApplyList.checkRight = (id, userData) => AnncmApplyList.destroy( {
    where: {
      id: id,
      userId: userId
    }
  });


  return AnncmApplyList;
}