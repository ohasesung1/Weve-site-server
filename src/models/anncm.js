module.exports = (sequelize, DataTypes) => {
  const Anncm = sequelize.define('anncm', {
    teamName: {
      field: 'teamName',
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    description: {
      field: 'description',
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    email: {
      field: 'email',
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    grade: {
      field: 'grade',
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    personnel: {
      field: 'personnel',
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    title: {
      field: 'title',
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    userName: {
      field: 'userName',
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    userId: {
      field: 'userId',
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    field: {
      field: 'field',
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    identifyId: {
      field: 'identifyId',
      type: DataTypes.INTEGER(100),
      allowNull: true,
      unipue: true
    },
    date: {
      field: 'date',
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    }, 
  }, {
    tableName: 'anncm',
    timestamps: false
  });

  Anncm.createAnncm = (teamName, title, description, email, grade, field, userId, personnel,userName, identifyId) => Anncm.create({
    teamName: teamName,
    title: title,
    description: description,
    email: email,
    grade: grade,
    field: field,
    userId: userId,
    userName: userName,
    personnel: personnel,
    identifyId: identifyId
  });

  Anncm.getAnncmList = () => Anncm.findAll({
    attuributes: ['id', 'title', 'date']
  });

  Anncm.getAnncm = (id) => Anncm.findOne({
    attuributes: ['id', 'title','description','email','grade', 'field','userId', 'personnel','date'],
    where: {
      id: id
    }
  });
  
  Anncm.getUserAnncm = (userId) => Anncm.findAll({
    attuributes: ['id', 'title','description','email','grade', 'field','userId', 'personnel','date'],
    where: {
      userId: userId
    }
  });

  Anncm.getNewAnncmId = () => sequelize.query(
    `SELECT * FROM anncm ORDER BY date DESC limit 1`
  );

  Anncm.modifyAnncm = (id, teamName,title, description, grade, personnel, field, email, userName) => Anncm.update({
    teamName: teamName,
    title: title,
    description: description,
    grade: grade,
    personnel: personnel,
    field: field,
    email: email,
    userName: userName
  },{
    where: {
      id: id
    }
  });

  Anncm.deleteAnncm = (id) => Anncm.destroy({
    where: {
      id: id
    }
  });

  Anncm.checkRight = (id, userId) => Anncm.findOne({
    where:{
      id: id,
      userId: userId,
    }, 
      raw: true,
  });



  return Anncm;
}