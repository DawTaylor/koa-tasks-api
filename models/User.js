module.exports = (sequelize, DataType) => {
  const User = sequelize.define('user', {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataType.STRING,
      allowNull: false,
    },
    pass: {
      type: DataType.STRING,
      allowNull: false,
    },
  });
  User.associate = function(models) {
    User.hasMany(models.task);
  };
  return User;
};
