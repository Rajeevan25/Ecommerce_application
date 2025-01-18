const express = require('express');
const { getProducts, getSingleProducts } = require('../controller/productController');
const router = express.Router();

router.route('/product').get(getProducts);
router.route('/product/:id').get(getSingleProducts);
module.exports = router;