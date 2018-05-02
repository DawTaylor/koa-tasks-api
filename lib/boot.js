module.exports = app => {
  const { port } = app.lib.config;
  app.db.sequelize.sync().done(() => {
    app.listen(port, () => console.log(`Listening on port ${port}`));
  });
};
