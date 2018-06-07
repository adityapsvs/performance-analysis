const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');

const db = require('../db');

/* GET home page. */
router.post('/login', (req, res) => {
  var redirect;
  if(req.body.empId == 'admin') {
    db.one('SELECT * FROM employees WHERE emp_id=$1 AND password=$2', [1000, req.body.password])
      .then(data => {
        redirect = 1;
        res.json({ redirect });
      })
      .catch(err => {
        redirect = 0;
        res.json({ redirect });
      });
  } else {
    db.one('SELECT password FROM employees WHERE emp_id=$1', [req.body.empId])
      .then(data => {
        bcrypt.compare(req.body.password, data.password, function(err, result) {
          if(result) {
            redirect = 2;
            res.json({ redirect });
          } else {
            redirect = 0;
            res.json({ redirect });
          }
        });
      })
      .catch(err => {
        redirect = 0;
        res.json({ redirect });
      });
  }
});

module.exports = router;
