const express = require('express');
const router = express.Router();
const passport = require('passport');

const db = require('../db');

/* GET home page. */
router.post('/login', passport.authenticate('local'), (req, res) => {
  console.log(req);
  // res.json({ lul: 'okay' });
  res.send('logged in');
})

router.post('/api/mark', (req, res) => {
  req.body.mark == '1' ?
    db.one('INSERT INTO attendance(emp_id, date, instatus_id) VALUES($1, $2, $3)', [req.body.empId, date(), req.body.instatus_id])
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error.message || error);
      }) :
    db.one('INSERT INTO attendance(emp_id, date, instatus_id) VALUES($1, $2, $3)', [req.body.empId, date(), req.body.outstatus_id])
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error.message || error);
      })
});

router.get('/api/user', (req, res) => {
  db.any('SELECT * FROM employees WHERE emp_id = $1', [req.body.empId])
    .then(function(data) {
        console.log(data);
    })
    .catch(function(error) {
        console.log(error.message || errror);
    });
});

router.get('/api/employee', (req, res) => {
  db.any('SELECT employeeofpreviousmonth FROM generallookup', [])
    .then(function(data) {
        console.log(data);
    })
    .catch(function(error) {
        console.log(error.message || errror);
    });
});

module.exports = router;
