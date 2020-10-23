// Update with your config settings.

module.exports = {

    development: {
      client: 'mysql',
      connection: {
        database: 'todoapp',
        user:     'root',
        password: 'root',
        //filename: './20201008103812_todoapp.js'
      },
      migrations: {
        directory:'./db/migrations',
        tableName: 'migration'
    }
    },
  
    staging: {
      client: 'mysql',
      connection: {
        database: 'todoapp',
        user:     'root',
        password: 'root'
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'migration'
      }
    },
  
    production: {
      client: 'mysql',
      connection: {
        database: 'todoapp',
        user:     'root',
        password: 'root'
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'migration'
      }
    }
  
  };