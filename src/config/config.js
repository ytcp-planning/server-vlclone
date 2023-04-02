const  { config } = require('dotenv'); 
const  { Sequelize } = require('sequelize');

config();

const db = new Sequelize(
  process.env.DB_NAME || "postgres",
  process.env.DB_USER || "postgres",
  process.env.DB_PASS || "123456a@",
  {
    dialect: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: 5432,
    logging: false,
  }
);

db.authenticate()
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

module.exports = { db };