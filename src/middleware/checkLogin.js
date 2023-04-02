const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
const { typeRole } = require("../enum/role.enum");
const Member = require("../models/member.model");

config();

module.exports = (req, res, next) => {
  // const str = req.originalUrl;
  const { authorization } = req.headers;
  //authorization === Bearer
  if (!authorization) {
    return res.status(401).json({ error: "You must be logged in" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ error: "You must be logged in" });
    }

    const { id, role } = decoded.payload;
    if (role*1 === typeRole.admin.id) {
      Member.findByPk(id).then((userData) => {
        req.user = userData;
        next();
      });
    } else {
      Member.findByPk(id).then((userData) => {
        req.user = userData;
        next();
      });
    }
  });
};
