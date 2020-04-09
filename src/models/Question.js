module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('question', {
    title: {
      field: 'title',
      type: DataTypes.STRING(1000),
      allowNull: false,
    }, 
    question: {
      field: 'question',
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    userId: {
      field: 'userId',
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    tag: {
      field: 'tag',
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    date: {
      field: 'date',
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'question',
    timestamps: false
  });

  Question.createQ = (title, question, tag, userId) => Question.create({
    title: title,
    question: question,
    tag: tag,
    userId: userId,
  });

  Question.QuestionList = () => Question.findAll({
    attuributes: ['id', 'title', 'question', 'answer', 'tag'],
  });

  Question.getQuestion = (id) => Question.findOne({
    attuributes: ['id', 'title', 'question', 'tag'],
    where: {
      id: id,
    }
  });

  Question.checkRight = (id, userId) => Question.findOne({
    attuributes: ['id', 'userId', 'question'],
    where: {
      id: id,
      userId: userId
    },
    raw: true,
  });
  
  Question.questionRemove = (id) => Question.destroy({
    where: {
      id: id
    }
  });

  Question.questionUpdate = (id, title, question, tag) => Question.update({
      question: question,
      title: title,
      tag: tag,
    }, {
      where: {
        id: id,
      }
    }
  );

  return Question;
}