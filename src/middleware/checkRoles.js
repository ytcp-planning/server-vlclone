const jwt = require("jsonwebtoken");
const {config} = require("dotenv");
const {typeRole} = require("../enum/role.enum");
const { statusMember } = require("../enum/member.enum");

config();

module.exports = (req, res, next) => { 
  const { role, status } = req.user;

  if (role*1 !== typeRole.admin.id || status !== statusMember.active.id) {
    return res.status(403).json({
      status_code: 403,
      error: "Permission Denied",
    });
  }
  next();
};
