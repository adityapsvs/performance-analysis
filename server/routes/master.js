const express = require('express');
const router = express.Router();

const db = require('../db');

router.post('/add-employee', (req, res) => {
  var message;
  if(req.body.empId == '') {
    db.any('INSERT INTO employees(emp_id, fullname, doj, password, image) VALUES(DEFAULT, $1, $2, $3, $4)', [req.body.fullName, req.body.doj, req.body.password, req.body.image])
      .then(data => {
        message = 1;
        res.json({ message });
      })
      .catch(err => {
        res.json({ err });
      });
  } else {
    db.any('INSERT INTO employees(emp_id, fullname, doj, password, image) VALUES($1, $2, $3, $4, $5)', [req.body.empId, req.body.fullName, req.body.doj, req.body.password, req.body.image])
      .then(data => {
        message = 1;
        res.json({ message });
      })
      .catch(err => {
        res.json({ err });
      });
  }
});

router.post('/add-eom', (req, res) => {
  db.any('UPDATE generallookup SET employeeofpreviousmonth=$1', [req.body.empId])
    .then(data => {
      message = 1;
      res.json({ data });
    })
    .catch(err => {
      res.json({ err });
    })
})

router.post('/add-start', (req, res) => {
  var time = req.body.startTime.split(':');
  db.none("UPDATE generallookup SET starttime=to_timestamp('$1:$2:$3', 'HH24:MI:SS')", [Number(time[0]), Number(time[1]), Number(time[2])])
    .then(data => {
      console.log(data);
      message = 1;
      res.json({ data });
    })
    .catch(err => {
      console.log(err);
      res.json({ err });
    });
});

router.post('/add-end', (req, res) => {
  var time = req.body.endTime.split(':');
  db.none("UPDATE generallookup SET endtime=to_timestamp('$1:$2:$3', 'HH24:MI:SS')", [Number(time[0]), Number(time[1]), Number(time[2])])
    .then(data => {
      message = 1;
      res.json({ data });
    })
    .catch(err => {
      res.json({ err });
    });
});

router.post('/add-message', (req, res) => {
  var message = req.body.message;
  db.none('UPDATE generallookup SET message=$1', [message])
    .then(data => {
      message = 1;
      res.json({ data });
    })
    .catch(err => {
      res.json({ err });
    });
});

router.post('/add-dates', (req, res) => {
  var dates = req.body.dates;
  for(var index in dates) {
    var date = new Date(dates[index]);
    db.none('INSERT INTO holidays VALUES(DEFAULT, $1)', [date])
      .then(data => {
        message = 1;
        res.json({ data });
      })
      .catch(err => {
        res.json({ err });
      });
  }
});

router.get('/employees', (req, res) => {
  db.any('SELECT holidaydate FROM holidays')
    .then(dates => {
      var enable;
      var date = new Date();
      for(var index in dates) {
        if(dates[index].holidaydate.getDate() === date.getDate() && dates[index].holidaydate.getMonth() === date.getMonth() && dates[index].holidaydate.getFullYear() === date.getFullYear()) {
          enable = 0;
          res.json({ enable });
        }
      }
      enable = 1;
      res.json({ enable });
    });
});

router.post('/performance', (req, res) => {
  db.any('SELECT instatus_id, outstatus_id FROM attendance WHERE emp_id=$1 AND DATE=current_date', [req.body.empId])
    .then(data => {
      var instatus_id = data[0].instatus_id, outstatus_id = data[0].outstatus_id;
      var entryPts, exitPts;
      switch(instatus_id) {
        case 1:
          entryPts = 5;
          break;
        case 2:
          entryPts = 2;
          break;
        case 3:
          entryPts = 1;
          break;
        default:
          break;
      }
      switch (outstatus_id) {
        case 1:
          exitPts = 1;
          break;
        case 2:
          exitPts = 2;
          break;
        case 3:
          exitPts = 5;
          break;
        default:
          break;
      }
      var punctuality = entryPts+exitPts;
      db.any('INSERT INTO performance VALUES($1, current_date, $2, $3, $4, $5, 0, $6)', [req.body.empId, punctuality, req.body.effort, req.body.efficiency, req.body.seriousness, req.body.timeWastage])
      .then(data => {
        res.json({ data });
      })
      .catch(err => {
        res.json({ err });
      });
    });
});

router.post('/good-reason', (req, res) => {
  db.any('INSERT INTO performance VALUES($1, current_date, 6.75, 6.75, 6.75, 6.75, 1, 6.75)', [req.body.empId])
    .then(data => {
      res.json({ data });
    })
    .catch(err => {
      console.log(err);
      res.json({ err })
    });
});

router.post('/bad-reason', (req, res) => {
  db.any('INSERT INTO performance VALUES($1, current_date, 6.5, 6.5, 6.5, 6.5, -1, 6.5)', [req.body.empId])
    .then(data => {
      res.json({ data });
    })
    .catch(err => {
      console.log(err);
      res.json({ err })
    });
});

router.post('/change-entry', (req, res) => {
  db.any('UPDATE attendance SET instatus_id=$1 WHERE emp_id=$2 AND date=current_date', [req.body.instatus, req.body.empId])
    .then(data => {
      console.log(data);
      res.json({ data });
    })
    .catch(err => {
      console.log(err);
      res.json({ err })
    });
});

router.post('/change-exit', (req, res) => {
  db.any('UPDATE attendance SET outstatus_id=$1 WHERE emp_id=$2 AND date=current_date', [req.body.outstatus, req.body.empId])
    .then(data => {
      res.json({ data });
    })
    .catch(err => {
      res.json({ err })
    });
});

module.exports = router;
