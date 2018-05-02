const Koa = require('koa');
const bcrypt = require('bcrypt');

const consign = require('consign');

const app = new Koa();

consign()
  .include('lib/config.js')
  .include('lib/middlewares.js')
  .include('db.js')
  .include('routes')
  .include('lib/boot.js')
  .into(app);

// db.sequelize.sync().done(() => {
//   route.get('/', async (ctx, next) => {
//     ctx.type = 'json';
//     ctx.body = JSON.stringify({ apiVersion: '1.0.0' });
//     next();
//   });
//   route.get('/:user/tasks', async (ctx, next) => {
//     const {
//       params: { user },
//     } = ctx;
//     const res = await db.models.task.findAll({ where: { user_id: user } });
//     ctx.type = 'json';
//     ctx.body = JSON.stringify(res);
//     next();
//   });
//   route.post('/:user/tasks', async (ctx, next) => {
//     const {
//       params: { user },
//     } = ctx;
//     const payload = {
//       ...ctx.request.body,
//       user_id: user,
//     };
//     const res = await db.models.task.create(payload);
//     ctx.type = 'json';
//     ctx.body = JSON.stringify(res);
//     next();
//   });
//   route.put('/:user/tasks/:task', async (ctx, next) => {
//     const { user, task } = ctx.params;
//     const res = await db.models.task.update(ctx.request.body, { where: { user_id: user, id: task } });
//     console.log(res);
//     ctx.type = 'json';
//     ctx.body = JSON.stringify(res);
//     next();
//   });
//   route.delete('/:user/tasks/:task', async (ctx, next) => {
//     const {
//       params: { user, task },
//     } = ctx;
//     await db.models.task.destroy({ where: { id: task, user_id: user } });
//     ctx.status = 204;
//     next();
//   });
//   route.post('/users', async (ctx, next) => {
//     const payload = {
//       ...ctx.request.body,
//       pass: await bcrypt.hash(ctx.request.body.pass, 10),
//     };
//     const res = await db.models.user.create(payload);
//     ctx.type = 'json';
//     ctx.body = JSON.stringify(res);
//     next();
//   });
//   route.post('/login', async (ctx, next) => {
//     const { email, pass } = ctx.request.body;
//     try {
//       const res = await db.models.user.findOne({ where: { email }, attributes: ['email', 'pass'] });
//       const status = await bcrypt.compare(pass, res.pass);
//       ctx.type = 'json';
//       ctx.body = JSON.stringify(status);
//       next();
//     } catch (err) {
//       console.error(err);
//       ctx.status = 500;
//       ctx.type = 'json';
//       ctx.body = JSON.stringify(err);
//       next();
//     }
//   });
//   app.listen(port, () => console.log(`Listening on ${port}`));
// });
