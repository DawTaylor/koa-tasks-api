const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const koaJson = require('koa-json');

const router = new Router();

module.exports = app => {
  app.use(bodyParser());
  app.use(koaJson());
  app.use(router.routes());
  app.use(router.allowedMethods());

  app.router = router;

  return app;
};
