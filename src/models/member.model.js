const Sequelize = require( "sequelize");
const { db } = require( "../config/config");

const Member = db.define("Member", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  fullname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  money: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  status: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
  },
  role: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
  resetToken: {
    type: Sequelize.STRING,
    defaultValue: "",
  },
  expireToken: {
    type: Sequelize.DATE,
    allowNull: true,
  },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});
module.exports = Member;
