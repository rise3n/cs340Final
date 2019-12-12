const  express = require('express');
const nav = require('../navGenerator');
const EmployeeRouter = express.Router();

EmployeeRouter.get('/Manager/:id/see_employee', (req, res, next) => {    
    var obj = new Object();

    req.db.query('select eid,ename from Employee where mgr_mid=?', [req.params.id],
        (err, results) => {
            if (err) return next(err);

            var obj = new Object();
            nav.createViewContext('manager', obj);
            var items = {
                rows: results
            }

            Object.assign(obj, items);
            res.render('see_Employee', obj);

        });
});

module.exports = EmployeeRouter;