const express = require('express')
const router = express.Router();
const timesheetController = require('../controllers/timesheetController')

router.get('/generate-timesheet/:studentId', timesheetController.generateTimeSheet)


router.put('/generate-timesheet/:studentId', timesheetController.updateTimesheet);

  module.exports=router