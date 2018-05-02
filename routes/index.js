module.exports = app => {
  const {
    lib: {
      middlewares: { router },
    },
  } = app;
  router.get('/', async (ctx, next) => {
    ctx.body = { status: 'ok', version: '1.0.0' };
  });
};
