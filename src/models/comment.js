module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('comment', {
    questionId: {
      field: 'questionId',
      type: DataTypes.INTEGER(100),
      allowNull: false,
    },
    answerId: {
      field: 'answerId',
      type: DataTypes.INTEGER(100),
      allowNull: false,
    },
    userId: {
      field: 'userId',
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    comment: {
      field: 'comment',
      type: DataTypes.STRING(1000),
      allowNull: true,
    }, 
    date: {
      field: 'date',
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    }
  }, {
    tableName: 'comment',
    timestamps: false
  });

  Comment.getComment = (id) => Comment.findAll({
    attributes: ['id','answerId', 'userId', 'comment', 'date'],
    where: {
      answerId: id
    }
  });

  Comment.writingComment = (answerId, questionId, comment, userId) => Comment.create({
    answerId: answerId,
    questionId: questionId,
    comment: comment,
    userId: userId,
  });

  Comment.deleteComment = (id) => Comment.destroy({
    where: {
      id: id
    }
  });

  Comment.deleteCommentAll = (questionId) => Comment.destroy({
    where: {
      questionId: questionId,
    }
  });

  Comment.deleteAnswerCommentAll = (answerId) => Comment.destroy({
    where: {
      answerId: answerId,
    }
  });
  
  Comment.modifyComment = (id, comment) => Comment.update({
    comment: comment,
  },{
    where: {
      id: id,
    }
  });

  Comment.checkRight = (id, userId) => Comment.findOne({
    attuributes: ['id', 'userId', 'question'],
    where: {
      id: id,
      userId: userId
    },
    raw: true,
  });


  return Comment;
}