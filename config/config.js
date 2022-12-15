require('dotenv').config()
module.exports = {
  development: {
    database: 'seq_keeper_development',
    dialect: 'postgres'
  },
  test: {
    database: 'seq_keeper_test',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
        require: true
      }
    }
  }
}
