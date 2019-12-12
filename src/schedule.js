const express = require('express');
const nav = require('../navGenerator');
const scheduleRouter = express.Router();


scheduleRouter.get('/Employee/:id/schedule', (req, res, next) => {
    var obj = new Object();
    nav.createViewContext('employee', obj);
    res.status(200).render('schedule', obj);

})

scheduleRouter.post('/Employee/:id/schedule', (req, res, next) => {
    var obj = new Object();
    nav.createViewContext('employee', obj);
    console.log(req.body);
    console.log(req.body.timeslot);
    /*
    var T = new Date(req.body.date); 
    var month = T.getMonth()+1;
    var date = T.getUTCDate();
    if (T.getMonth() + 1 < 10)
        month = '0' + month;
    if (T.getUTCDate() < 10)
       date = '0' + date;

    T = month + '/' + date + '/' + T.getUTCFullYear();
    console.log(T);

*/
    if (req.body.timeslot == "morning" || req.body.timeslot == "noon" || req.body.timeslot == "afternoon") {

        req.db.query('Update Employee set date=? where Employee.eid=?', [req.body.date, req.params.id],
            err => {
                if (err) return next(err);
                req.db.query('update Work_rotation set ' + req.body.timeslot + '= (select ename from Employee where eid=?)' + ' Where date=?',
                    [req.params.id,req.body.date],err => {
                        if (err) next(err);

                    });

                res.send("update success\n");
                res.end();

            });
    }
    else {
        res.end();
    }
        
});

module.exports = scheduleRouter;