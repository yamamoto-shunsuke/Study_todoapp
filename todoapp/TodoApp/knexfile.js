// Update with your config settings.

module.exports = {

    development: {
      client: 'mysql',
      connection: {
        database: 'todoapp',
        user:     'root',
        password: '@atomitech12',
        //filename: './20201008103812_todoapp.js'
      },
      migrations: {
        directory:'./db/migrations',
        tableName: 'task'
    }
    },
  
    staging: {
      client: 'mysql',
      connection: {
        database: 'todoapp',
        user:     'root',
        password: '@atomitech12'
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'task'
      }
    },
  
    production: {
      client: 'mysql',
      connection: {
        database: 'todoapp',
        user:     'root',
        password: '@atomitech12'
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'task'
      }
    }
  
  };