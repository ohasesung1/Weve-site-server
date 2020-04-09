module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('team',{
    teamName: {
      field: 'teamName',
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    title: {
      field: 'title',
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    contents: {
      field: 'contents',
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    userName: {
      field: 'userName',
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    email: {
      field: 'email',
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    identifyId: {
      field: 'identifyId',
      type: DataTypes.INTEGER(100),
      allowNull: false,
      unipue: true,
    },
    date: {
      field: 'date',
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'team',
    timestamps: false,
  });

  Team.createTeamPost = (teamName, userName, title, contents, email, identifyId ) => Team.create({
      teamName: teamName,
      userName: userName,
      title: title,
      contents: contents,
      email: email,
      identifyId: identifyId
  }); 

  Team.getNewPostId = () => sequelize.query(
    `SELECT * FROM team ORDER BY date DESC limit 1`
  );

  return Team;
}