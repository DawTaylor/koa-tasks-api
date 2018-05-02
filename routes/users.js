const bcrypt = require('bcrypt');

module.exports = app => {
  const {
    lib: {
      middlewares: { router },
    },
    db: { sequelize: db },
  } = app;

  router.post('/users', async (ctx, next) => {
    const payload = {
      ...ctx.request.body,
      pass: await bcrypt.hash(ctx.request.body.pass, 10),
    };
    const res = await db.models.user.create(payload);
    ctx.body = res;
    next();
  });

  router.post('/login', async (ctx, next) => {
    const { email, pass } = ctx.request.body;
    const res = await db.models.user.findOne({ where: { email }, attributes: ['email', 'pass'] });
    const status = await bcrypt.compare(pass, res.pass);
    ctx.body = status;
    next();
  });
};
