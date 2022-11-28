const express = require('express');
const router = express.Router();


router.get('/screen', (req, res) => {
  res.send('screen.js about PATH');
});



module.exports = router