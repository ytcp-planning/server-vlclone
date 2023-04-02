const Sequelize = require( "sequelize");
const { db } = require( "../config/config");
const { statusProductCategory } = require("../enum/product_category.enum");

const ProductCategory = db.define("ProductCategory", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  coverImage: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  status: {
    type: Sequelize.INTEGER,
    defaultValue: statusProductCategory.new.id
  },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = ProductCategory;
