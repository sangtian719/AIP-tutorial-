const express = require('express');
const router = express.Router();

//  @route  GET api/event/test
//  @desc   Test event route
//  @access Public

router.get('/test', (req, res)=> res.json({msg: "event works"}));

module.exports = router;