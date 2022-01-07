const express = require('express');
const router = express.Router();


const {foreverExcute} = require('../Controller/index');
router.get('/foreverExcute', foreverExcute());
module.exports = router;