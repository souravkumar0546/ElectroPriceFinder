const express = require('express');
const { searchParts, updateCartPrice } = require('../controllers/searchController');

const router = express.Router();

router.post('/search', searchParts);
router.post('/updateprice', updateCartPrice);

module.exports = router;
