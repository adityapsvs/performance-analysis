const express = require('express');
const router = express.Router();
const moment = require('moment');

const db = require('../db');

router.get('/details', (req, res) => {
  db.one('SELECT * FROM employees WHERE emp_id = $1', [req.query.empId])
    .then(details => {
      res.json({ details });
    })
    .catch(err => {
      console.log('Error in details:', err);
    });
});

router.get('/employee', (req, res) => {
  db.one('SELECT employeeofpreviousmonth FROM generallookup', [])
    .then(employee => {
      db.one('SELECT image FROM employees WHERE emp_id=$1', [employee.employeeofpreviousmonth])
        .then(image => {
          var imageURL = image.image;
          res.json({ employee, imageURL });
        });
    });
});

router.get('/message', (req, res) => {
  db.one('SELECT message FROM generallookup', [])
    .then(message => {
      console.log(message);
      res.json({ message });
    })
    .catch(err => {
      console.log(err);
      message = 0;
      res.json({ message });
    })
})

router.get('/attendance', (req, res) => {
  db.any('SELECT * FROM attendance WHERE emp_id = $1 AND EXTRACT(DAY FROM date) = EXTRACT(DAY FROM current_date)', [req.query.empId])
    .then(attendance => {
      var enableEntry, enableExit;
      db.any('SELECT holidaydate FROM holidays')
        .then(dates => {
          var date = new Date();
          for(var index in dates) {
            if(dates[index].holidaydate.getDate() === date.getDate() && dates[index].holidaydate.getMonth() === date.getMonth() && dates[index].holidaydate.getFullYear() === date.getFullYear()) {
              enableEntry = 0;
              enableExit = 0;
              res.json({ enableEntry, enableExit });
            }
          }
          if( attendance.length == 0 ) {
            enableEntry = 1;
            enableExit = 1;
            res.json({ enableEntry, enableExit });
          } else if( attendance[0]['instatus_id'] !== null && attendance[0]['outstatus_id'] == null ) {
            enableEntry = 0;
            enableExit = 1;
            res.json({ enableEntry, enableExit })
          } else if( attendance[0]['instatus_id'] !== null && attendance[0]['outstatus_id'] !== null ) {
            enableEntry = 0;
            enableExit = 0;
            res.json({ enableEntry, enableExit })
          }
        });
    })
})

router.get('/analytics', (req, res) => {
  db.any('SELECT date, punctuality, effort, efficiency, seriousness, timewastage FROM performance WHERE emp_id = $1 AND EXTRACT(MONTH FROM date) = EXTRACT(MONTH FROM current_date)', [req.query.empId])
    .then(analytics => {
      var punctuality = []
        , effort = []
        , timeWastage = []
        , efficiency = []
        , seriousness = []
        , averageArray = [];
      var average = 0;
      for(let index in analytics) {
        let element = analytics[index];
        let rawDate = String(element.date).split(' ');
        let date = rawDate[1]+" "+rawDate[2]+" "+rawDate[3];
        punctuality.push({date: date, punctuality: Number(element.punctuality)});
        effort.push({date: date, effort: Number(element.effort)});
        timeWastage.push({date: date, timeWastage: Number(element.timewastage)});
        efficiency.push({date: date, efficiency: Number(element.efficiency)});
        seriousness.push({date: date, seriousness: Number(element.seriousness)});
        averageArray.push((punctuality[index].punctuality+effort[index].effort+timeWastage[index].timeWastage+efficiency[index].efficiency+seriousness[index].seriousness)/5);
      }
      averageArray.forEach(function(element) {
        average += element;
      });
      var average = average/averageArray.length;
      var improvement;
      if( average >= 7.5 ) {
        improvement = 0;
        res.json({ improvement, punctuality, effort, timeWastage, efficiency, seriousness });
      } else {
        let now = new Date();
        let totalDays = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
        improvement = (totalDays*7.5-averageArray.length*average)/(totalDays-averageArray.length);
        res.json({ improvement, punctuality, effort, timeWastage, efficiency, seriousness });
      }
    });
});

router.post('/mark-entry', (req, res) => {
  db.one('SELECT starttime FROM generallookup')
    .then(data => {
      var received = data.starttime;
      var receivedHours = Number(received.split(':')[0]), receivedMin = Number(received.split(':')[1]), receivedSec = Number(received.split(':')[2]);

      var today = String(new Date());
      var currentHours = Number(today.split(' ')[4].split(':')[0]), currentMin = Number(today.split(' ')[4].split(':')[1]), currentSec = Number(today.split(' ')[4].split(':')[2]);

      var hourDiff = currentHours - receivedHours, minDiff = currentMin - receivedMin, secDiff = currentSec - receivedSec;

      var totalDiff = hourDiff*60*60+minDiff*60+secDiff;

      var message;

      if(totalDiff <= 0) {
        db.any('INSERT INTO attendance(emp_id, date, instatus_id) VALUES($1, current_date, 1)', [req.body.empId])
          .then(data => {
            message = 1;
            res.json({ message });
          })
          .catch(err => {
            res.json({ err });
          })
      } else if(totalDiff > 0 && totalDiff <= 7200 ) {
        db.any('INSERT INTO attendance(emp_id, date, instatus_id) VALUES($1, current_date, 2)', [req.body.empId])
          .then(data => {
            message = 1;
            res.json({ message });
          })
          .catch(err => {
            res.json({ err });
          })
      } else if(totalDiff > 7200) {
        db.any('INSERT INTO attendance(emp_id, date, instatus_id) VALUES($1, current_date, 3)', [req.body.empId])
          .then(data => {
            message = 1;
            res.json({ message });
          })
          .catch(err => {
            res.json({ err });
          })
      }
    });
})

router.post('/mark-exit', (req, res) => {
  db.one('SELECT endtime FROM generallookup')
    .then(data => {
      var received = data.endtime;
      var receivedHours = Number(received.split(':')[0]), receivedMin = Number(received.split(':')[1]), receivedSec = Number(received.split(':')[2]);

      var today = String(new Date());
      var currentHours = Number(today.split(' ')[4].split(':')[0]), currentMin = Number(today.split(' ')[4].split(':')[1]), currentSec = Number(today.split(' ')[4].split(':')[2]);

      var hourDiff = currentHours - receivedHours, minDiff = currentMin - receivedMin, secDiff = currentSec - receivedSec;

      var totalDiff = hourDiff*60*60+minDiff*60+secDiff;

      var message;

      if(totalDiff >= 0) {
        db.any('UPDATE attendance SET outstatus_id=3 WHERE emp_id=$1 AND date=current_date', [req.body.empId])
          .then(data => {
            message = 1;
            res.json({ message });
          })
          .catch(err => {
            res.json({ err });
          })
      } else if(totalDiff < 0 && totalDiff >= -7200 ) {
        db.any('UPDATE attendance SET outstatus_id=2 WHERE emp_id=$1 AND date=current_date', [req.body.empId])
          .then(data => {
            message = 1;
            res.json({ message });
          })
          .catch(err => {
            res.json({ err });
          })
      } else if(totalDiff < -7200) {
        db.any('UPDATE attendance SET outstatus_id=1 WHERE emp_id=$1 AND date=current_date', [req.body.empId])
          .then(data => {
            message = 1;
            res.json({ message });
          })
          .catch(err => {
            res.json({ err });
          })
      }
    });
})

module.exports = router;
