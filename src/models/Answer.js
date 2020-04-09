module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('answer', {
    questionId: {
      field: 'questionId',
      type: DataTypes.INTEGER(100),
      allowNull: false,
    },
    userId: {
      field: 'userId',
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    answer: {
      field: 'answer',
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    date: {
      field: 'date',
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    }, 
  }, {
    tableName: 'answer',
    timestamps: false
  });

  Answer.findAnswer = (id) => Answer.findAll({
    attuributes: ['userId', 'answer', 'date'],
    where: {
      questionId: id,
    }
  });


  Answer.createAnswer = (id, answer, userId) => Answer.create({
    questionId: id,
    answer: answer,
    userId: userId,
  });

  Answer.deleteAnswer = (id) => Answer.destroy({
    where: {
      id: id
    }
  });

  Answer.deleteAnswerAll = (id) => Answer.destroy({
    where: {
      questionId: id
    }
  });

  Answer.modifyAnswer = (id, answer, userId) => Answer.update({
    answer: answer,
  }, {
    where: {
      id: id,
      userId: userId
    },
    raw: true,
  });

  Answer.checkRight = (id, userId) => Answer.findOne({
    attuributes: ['id', 'userId', 'question'],
    where: {
      id: id,
      userId: userId
    },
    raw: true,
  });

  return Answer;
}