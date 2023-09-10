const express = require('express');
const router = express.Router();

const fileController = require('../conroller/file.controller');

router.use('/file', fileController);

module.exports = router;