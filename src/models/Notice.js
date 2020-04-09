module.exports = (sequelize, DataTypes) => {
  const Notice = sequelize.define('notice' ,{
    identifyId: {
      field: 'identifyId',
      type: DataTypes.INTEGER(100),
      allowNull: true,
      unique: true
    },
    title: {
      field: 'title',
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    userName: {
      field: 'username',
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    description: {
      field: 'description',
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    userId: {
      field: 'userId',
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    date: {
      field: 'date',
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'notice',
    timestamps: false,
  });

  Notice.createNotice = (title, description, identifyId, userId, userName) => Notice.create({
    title: title,
    description: description,
    identifyId: identifyId,
    userId: userId,
    userName: userName
  });

  Notice.getNoticeList = () => Notice.findAll({
    attuributes: ['id', 'title', 'description'],
  });

  Notice.getNewNoticeId = () => sequelize.query(
    `SELECT * FROM notice ORDER BY date DESC limit 1`
  );

  Notice.getNotice = (id) => Notice.findOne({
    attuributes: ['id', 'title', 'description'],

    where: {
      id: id
    }
  });

  Notice.deleteNotice = (id) => Notice.destroy({
    where: {
      id: id
    }
  });

  Notice.updateNotice = (id, title, description) => Notice.update({
    title: title,
    description: description,
  }, {
    where: {
      id: id
    }
  }
  );

  Notice.checkRight = (id, userId) => Notice.findOne({
    where: {
      id: id,
      userId: userId
    },
    raw: true,
  });

  return Notice;
}