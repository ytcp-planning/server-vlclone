const express = require('express')

const {
  signIn,
  signUp,
  forgotPassword,
  newPassword,
} = require("../controllers/auth.controller");
const router = express.Router();

// const router = new Router({
//   prefix: "/v1/auth",
// });

//Member
router.post("/v1/auth/signup", signUp);
router.post("/v1/auth/login", signIn);
router.post("/v1/auth/forgot-password", forgotPassword);
router.post("/v1/auth/new-password", newPassword);

module.exports = router;
