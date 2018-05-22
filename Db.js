const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

let database;

module.exports = app => {
  const {
    lib: { config: db },
  } = app;
  if (!database) {
    const sequelize = !db.dbUri
      ? new Sequelize(db.name, db.user, db.pass, {
          define: {
            underscored: true,
          },
          dialect: 'sqlite',
          storage: db.storage,
          operatorsAliases: false,
          logging: false,
        })
      : new Sequelize(db.dbUri);

    database = {
      sequelize,
      Sequelize,
      models: {},
    };
    const dir = path.join(__dirname, 'models');
    fs.readdirSync(dir).map(file => {
      const modelDir = path.join(dir, file);
      const model = sequelize.import(modelDir);
      database.models[model.name] = model;
    });
    Object.keys(database.models).map(key => database.models[key].associate(database.models));
  }
  return database;
};
