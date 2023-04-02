const Sequelize = require("sequelize");
const { db } = require("../config/config");
const { statusProduct } = require("../enum/product.enum");

const Product = db.define("Product", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    category_id: {
        type: Sequelize.INTEGER, 
        allowNull: false,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    price: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    status: {
        type: Sequelize.INTEGER,
        defaultValue: statusProduct.new.id
    },
    cover_image: {
        type: Sequelize.JSON,
        allowNull: true
    },
    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    list_service: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
    },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  });

module.exports = Product;
