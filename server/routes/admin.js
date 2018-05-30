const express = require('express');
const router = express.Router();

const db = '../db';

router.get('/employees', (req, res) => {
  db.one('SELECT emp_id, fullname FROM emloyees')
    .then(details => {
      res.json({details});
    })
})

module.exports = router;
