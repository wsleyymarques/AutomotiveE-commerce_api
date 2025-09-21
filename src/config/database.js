require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,   // corrigido
    database: process.env.DB_DATABASE,   // corrigido
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
};
