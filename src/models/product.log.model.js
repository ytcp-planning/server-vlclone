const Sequelize = require( "sequelize");
const { db } = require( "../config/config");

const ProductLog = db.define("ProductLog", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  }, 
  product_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  creator: {
    type: Sequelize.JSON
  },
  column: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  old_data: {
    type: Sequelize.JSON,
    defaultValue: {}, 
    allowNull: true,
  },
  new_data: {
    type: Sequelize.JSON,
    defaultValue: {},
    allowNull: true,
  },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  });

module.exports = ProductLog;
