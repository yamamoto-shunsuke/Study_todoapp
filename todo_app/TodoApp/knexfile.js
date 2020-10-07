// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      filename: './dev.sqlite3'
    },
    migrations: {
      directory:'./db/migrations',
      tableName: 'knex_migrations'
  }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'todoapp',
      user:     'root',
      password: '@atomitech12'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'todoapp',
      user:     'root',
      password: '@atomitech12'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
