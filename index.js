const Koa = require('koa');
const consign = require('consign');

const app = new Koa();

consign({ verbose: true })
  .include('lib/config.js')
  .include('lib/middlewares.js')
  .include('Db.js')
  .include('routes')
  .include('lib/boot.js')
  .into(app);
