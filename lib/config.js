module.exports = app => ({
  port: process.env.NODE_PORT || process.env.PORT || 5000,
  db: {
    dbUri: process.env.DATABASE_URL || null,
    name: process.env.DB_NAME || 'tasks',
    user: process.env.DB_USER || 'ifsp',
    pass: process.env.DB_PASS || '123123123',
    storage: process.env.DB_STORAGE || 'tasks.sqlite',
  },
});
