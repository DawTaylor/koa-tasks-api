module.exports = app => {
  const {
    lib: {
      middlewares: { router },
    },
    db: { sequelize: db },
  } = app;

  router.get('/:user/tasks', async (ctx, next) => {
    const {
      params: { user },
    } = ctx;
    const res = await db.models.task.findAll({ where: { user_id: user } });
    ctx.body = res;
    next();
  });

  router.post('/:user/tasks', async (ctx, next) => {
    const {
      params: { user },
    } = ctx;
    const payload = {
      ...ctx.request.body,
      user_id: user,
    };
    const res = await db.models.task.create(payload);
    ctx.body = res;
    next();
  });

  router.put('/:user/tasks/:task', async (ctx, next) => {
    const { user, task } = ctx.params;
    const res = await db.models.task.update(ctx.request.body, { where: { user_id: user, id: task } });
    ctx.body = res;
    next();
  });

  router.delete('/:user/tasks/:task', async (ctx, next) => {
    const {
      params: { user, task },
    } = ctx;
    await db.models.task.destroy({ where: { id: task, user_id: user } });
    ctx.status = 204;
    next();
  });
};
