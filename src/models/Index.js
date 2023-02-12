const dbConfig = require("../utils/dbConnect");

const {Sequelize, QueryTypes} = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.QueryTypes = QueryTypes;

db.accounts = require("./Account")(sequelize, Sequelize);
db.transction = require("./Transaction")(sequelize, Sequelize);
db.ledger = require("./Ledger")(sequelize, Sequelize);

module.exports = db;