const express = require('express');

const router = express.Router();

router.get('/getprofiles', (req, res) => res.json({"name":"profile1"}));

module.exports = router;