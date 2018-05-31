const express = require('express');
const router = express.Router();

const db = '../db';

router.get('/employees', (req, res) => {
  db.one('SELECT emp_id, fullname FROM emloyees')
    .then(details => {
      console.log(details);
      res.json({details});
    });
});

router.post('/add-employee', (req, res) => {
  var message;
  if(req.body.empId == '') {
    db.any('INSERT INTO employees(emp_id, fullname, doj, password) VALUES(DEFAULT, $1, $2, $3)', [req.body.fullName, req.body.doj, req.body.password])
      .then(data => {
        message = 1;
        res.json({ message });
      })
      .catch(err => {
        res.json({ err });
      });
  } else {
    db.any('INSERT INTO employees(emp_id, fullname, doj, password) VALUES($1, $2, $3, $4)', [req.body.empId, req.body.fullName, req.body.doj, req.body.password])
      .then(data => {
        message = 1;
        res.json({ message });
      })
      .catch(err => {
        res.json({ err });
      });
  }
});

module.exports = router;
