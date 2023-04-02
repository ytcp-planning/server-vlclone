const jwt = require( "jsonwebtoken");
const { config } = require( "dotenv");

config();

const signJWT = (user) => {
  const jwtUser = jwt.sign({ payload: user }, process.env.SECRET_KEY, {
    expiresIn: "12h",
  });

  return jwtUser;
};

module.exports = {
  signJWT
}