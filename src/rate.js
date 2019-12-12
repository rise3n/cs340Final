const express = require('express');
const nav = require('../navGenerator');

const rateRouter = express.Router();


rateRouter.get('/Employee/:id/rate', (req, res, next) => {
    var obj = new Object();
    nav.createViewContext('employee', obj);
    res.status(200).render('rate', obj);

})

rateRouter.post('/Employee/:id/rate', (req, res, next) => {
    var obj = new Object();
    nav.createViewContext('Manager', obj);
    console.log(req.body);

    req.db.query('SELECT * FROM rating WHERE eid = ? and mid=?', [req.params.id,req.body.mid], (err, results) => {
        if (err) return next(err);
        if (results.length) {
            res.send("rating exist\n");
            res.end();
        }
        else {
            req.db.query('INSERT INTO `rating` (eid,mid,stars,reason) VALUES (?,?,?,?)', [req.params.id, req.body.mid, req.body.stars, req.body.reason],
                 err => {
                    if (err) return next(err);
                    res.send("update success\n");
                    res.end();
                });

        }

    });        

})

rateRouter.get('/Employee/:id/rate/lowest', (req, res, next) => {
    var obj = new Object();
    nav.createViewContext('employee', obj);

    req.db.query('select  A.mid, A.mname, A.average from (select M.mid, M.mname, avg(R.stars) as average from Manager as M, rating as R where M.mid = R.mid group by M.mid order by average desc) A limit 1',
        (err, results) => {
            if (err) next(err);
            var obj = new Object();
            nav.createViewContext('employee', obj);
            var items = {
                rows: results
            }

            Object.assign(obj, items);
            console.log(obj);
            res.render('seeLowest', obj);

        });

})

module.exports = rateRouter;