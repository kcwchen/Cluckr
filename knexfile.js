// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: 'cluckr',
    },
    migrations: {
      tableName: 'migrations',
      directory: 'db/migrations',
    },
    seeds: {
      directory: 'db/seeds',
    },
  },
};
