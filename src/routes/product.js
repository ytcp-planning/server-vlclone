const express = require('express');
const { getAllProduct, getProductByID, postProduct, updateProduct } = require('../controllers/product.controller');
const checkLogin = require('../middleware/checkLogin')
const checkRoles = require('../middleware/checkRoles')
const router = express.Router();

//Product
router.get("/v1/product", checkLogin, getAllProduct);
router.get("/v1/product/:id",checkLogin, getProductByID )

//Post Product 
router.post('/v1/product',checkLogin, checkRoles, postProduct)

//Update Product 
router.put('/v1/product/:id',checkLogin, checkRoles, updateProduct)

module.exports = router;
