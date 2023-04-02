const express = require('express');
const { getAllProductCategory, getProductCategoryByID, postProductCategory, updateProductCategory } = require('../controllers/product_category.controller');
const checkLogin = require('../middleware/checkLogin')
const checkRoles = require('../middleware/checkRoles')
const router = express.Router();

//ProductCategory
router.get("/v1/product-category", checkLogin, getAllProductCategory);
router.get("/v1/product-category/:id",checkLogin, getProductCategoryByID )

//Post ProductCategory 
router.post('/v1/product-category',checkLogin, checkRoles, postProductCategory)

//Update ProductCategory 
router.put('/v1/product-category/:id',checkLogin, checkRoles, updateProductCategory)

module.exports = router;
