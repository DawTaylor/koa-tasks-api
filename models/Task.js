module.exports = (sequelize, DataType) => {
  const Task = sequelize.define('task', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataType.STRING,
      allowNull: false,
    },
    done: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
  Task.associate = function(models) {
    Task.belongsTo(models.user);
  };
  return Task;
};
