const express = require('express');
const { getAllMember, getMemberByID, postAdmin, updateAdmin } = require('../controllers/member.controller');
const checkLogin = require('../middleware/checkLogin')
const checkRoles = require('../middleware/checkRoles')
const router = express.Router();

//Member
router.get("/v1/member", checkLogin, checkRoles, getAllMember);
router.get("/v1/member/:id",checkLogin, checkRoles, getMemberByID )

//Post Member 
router.post('/v1/member',checkLogin, checkRoles, postAdmin)

//Update Member 
router.put('/v1/member/:id',checkLogin, checkRoles, updateAdmin)

module.exports = router;
