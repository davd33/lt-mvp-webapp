const express = require('express');
const router = express.Router();


/**
 * send back a random list of lucken tests
 */
router.get('/lt/randoms', (req, res) => {
  res.send('api works');
});

module.exports = router;
