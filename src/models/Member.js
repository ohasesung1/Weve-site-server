module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define('Member', {
    id: {
      field: 'id',
      type: DataTypes.STRING(100),
      allowNull: false,
      unipue: true,
      primaryKey: true,
    },
    pw: {
      field: 'pw',
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    name: {
      field: 'name',
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      field: 'email',
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    profile_image: {
      field: 'profile_image',
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    auth: {
      field: 'auth',
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    join_date: {
      field: 'join_date',
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    }, 
    }, {
      tablename: 'member',
      timestamps: false,
    });

    Member.findMemberForLogin = (id, pw) => Member.findOne({
      attributes: ['id','email', 'profile_image', 'name','join_date', 'auth'],

      where: {
        id: id,
        pw: pw,
      },

      raw: true,
    });

    Member.findMemberId = (id) => Member.findOne({
      where: {
        id: id,
      },

      raw: true,
    });

    Member.registerMember = (id, pw, name, email, auth, profile_image) => Member.create({
      id: id,
      pw, pw,
      name: name,
      email, email,
      auth: auth,
      profile_image: profile_image,
    });

    return Member;
}