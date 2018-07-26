const express = require('express');

const router = express.Router();

router.get('/getusers', (req, res) => res.json({"name":"user1"}));

module.exports = router;