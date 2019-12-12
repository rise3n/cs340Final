const express = require('express');
const nav = require('../navGenerator');
const registerRouter = express.Router();
const crypt = require('crypto');

registerRouter.get('/Manager/:id/register', (req, res, next) => {
    var obj = new Object();
    nav.createViewContext('manager', obj);
    res.status(200).render('register', obj);

})

registerRouter.post('/Manager/:id/register', (req, res, next) => {
    var obj = new Object();
    nav.createViewContext('manager', obj);

    console.log("req.body:", req.body);

    req.db.query('SELECT * FROM Employee WHERE eid = ?', [req.body.id], (err, results) => {
        if (err) return next(err);
        if (results.length) {
            res.send("eid exist\n");
            res.end();
        }
        else {
            req.db.query('INSERT INTO`Employee`(eid, ename, password, salary, mgr_mid, date) VALUES(?,?,?,?,?,?)',
                [req.body.id, req.body.name, crypt.createHash('md5').update(req.body.password).digest('hex'), req.body.salary, req.body.mgr_mid, req.body.date],
                err => {
                    if (err) return next(err);
                    res.send("update success\n");
                    res.end();

                });
        }
    });
});

module.exports = registerRouter;