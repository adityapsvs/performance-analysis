const express = require('express');
const router = express.Router();

const db = require('../db');

router.get('/details', (req, res) => {
  db.one('SELECT * FROM employees WHERE emp_id = $1', [req.query.empId])
    .then(details => {
      res.json({ details });
    });
});

router.get('/employee', (req, res) => {
  db.one('SELECT employeeofpreviousmonth FROM generallookup', [])
    .then(employee => {
      res.json({ employee });
    });
});

router.get('/attendance', (req, res) => {
  db.any('SELECT * FROM attendance WHERE emp_id = $1 AND EXTRACT(DAY FROM date) = EXTRACT(DAY FROM current_date)', [req.query.empId])
    .then(attendance => {
      var enableEntry
        , enableExit;
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
        punctuality.push({ punctuality: element.punctuality });
        effort.push({ effort: element.effort });
        timeWastage.push({ timeWastage: element.timewastage });
        efficiency.push({ efficiency: element.efficiency });
        seriousness.push({ seriousness: element.seriousness });
        averageArray.push((element.punctuality+element.effort+element.efficiency+element.seriousness+element.timewastage)/5);
      }
      averageArray.forEach(function(element) {
        average += element;
      });
      var average = average/averageArray.length;
      var improvement;
      if( average >= 7.5 ) {
        improvement = 0;
        res.json({ improvement, punctuality, effort, timeWastage, efficiency, seriousness })
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
      var today = new Date()
      var day = today.getUTCDate()
        , month = today.getUTCMonth()+1
        , year = today.getUTCFullYear()
        , hours = Number(received.split(':')[0])
        , minutes = Number(received.split(':')[1])
        , seconds = Number(received.split(':')[2])
      console.log(day, month, year, hours, minutes, seconds);
    })
  // db.one('INSERT INTO attendance')
})

module.exports = router;
