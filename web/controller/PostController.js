const express = require('express');

const router = express.Router();

router.get('/getposts', (req, res) => res.json({"name":"post1"}));

module.exports = router;