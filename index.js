const Koa = require('koa');
const Router = require('koa-router');
const bodyparser = require('koa-bodyparser');
const bcrypt = require('bcrypt');

const db = require('./Db')();

const port = process.env.NODE_PORT || 5000;

const app = new Koa();
const route = new Router();

app.use(bodyparser());
app.use(route.routes()).use(route.allowedMethods());

db.sequelize.sync().done(() => {
  route.get('/', async (ctx, next) => {
    ctx.type = 'json';
    ctx.body = JSON.stringify({ apiVersion: '1.0.0' });
    next();
  });
  route.get('/:user/tasks', async (ctx, next) => {
    const {
      params: { user },
    } = ctx;
    const res = await db.models.task.findAll({ user_id: user });
    ctx.type = 'json';
    ctx.body = JSON.stringify(res);
    next();
  });
  route.post('/:user/tasks', async (ctx, next) => {
    const {
      params: { user },
    } = ctx;
    const payload = {
      ...ctx.request.body,
      user,
    };
    const res = await db.models.task.create(payload);
    ctx.type = 'json';
    ctx.body = JSON.stringify(res);
    next();
  });
  route.put('/:user/tasks/:task', async (ctx, next) => {
    const {
      params: { user, task },
    } = ctx;
    const res = await db.models.task.update(ctx.request.body, { where: { user_id: user, id: task } });
    console.log(res);
    ctx.type = 'json';
    ctx.body = JSON.stringify(res);
    next();
  });
  route.post('/users', async (ctx, next) => {
    const payload = {
      ...ctx.request.body,
      pass: await bcrypt.hash(ctx.request.body.pass, 10),
    };
    const res = await db.models.user.create(payload);
    ctx.type = 'json';
    ctx.body = JSON.stringify(res);
    next();
  });
  route.post('/login', async (ctx, next) => {
    const { email, pass } = ctx.request.body;
    try {
      const res = await db.models.user.findOne({ where: { email }, attributes: ['email', 'pass'] });
      const status = await bcrypt.compare(pass, res.pass);
      ctx.type = 'json';
      ctx.body = JSON.stringify(status);
      next();
    } catch (err) {
      console.error(err);
      ctx.status = 500;
      ctx.type = 'json';
      ctx.body = JSON.stringify(err);
      next();
    }
  });
  app.listen(port, () => console.log(`Listening on ${port}`));
});
