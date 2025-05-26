const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registrationController');

router.post('/', registrationController.registerUser);
router.get('/:eventId/download', registrationController.downloadRegistrations);

module.exports = router;
