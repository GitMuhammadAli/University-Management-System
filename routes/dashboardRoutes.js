const express = require('express');
const router = express.Router();

const dashboard = require('../controllers/dashboardController');


router.get('/dashboard',dashboard.getAlldashboardCounts);

module.exports = router;