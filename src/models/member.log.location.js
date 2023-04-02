const Sequelize = require("sequelize");
const { db } = require("../config/config");

const MemberLogLocation = db.define("MemberLogLocation", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  member_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  ip_address: {
    type: Sequelize.JSON
  },
  brower_type: {
    type: Sequelize.JSON,
    defaultValue: {},
    allowNull: true,
  },
  status: {
    type: Sequelize.JSON,
    defaultValue: {},
    allowNull: true,
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = MemberLogLocation;
