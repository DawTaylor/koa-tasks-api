const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
let db

module.exports = () => {
  if (!db) {
    let sequelize = new Sequelize(
      'tasks',
      'daw',
      '123123123',
      {
        define: {
          underscored: true
        },
        dialect: 'sqlite',
        storage: 'tasks.sqlite'
      }
    )
    db = {
      sequelize,
      Sequelize,
      models: {}
    }
    const dir = path.join(__dirname, 'models')
    fs.readdirSync(dir).map(file => {
      const modelDir = path.join(dir, file)
      const model = sequelize.import(modelDir)
      db.models[model.name] = model
    })
    Object.keys(db.models).map(key => db.models[key].associate(db.models))
  }
  return db
}
