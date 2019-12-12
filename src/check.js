const express = require('express');
const nav = require('../navGenerator');

const checkRouter = express.Router();

checkRouter.get('/Manager/:id/check', (req, res, next) => {
    var obj = new Object();
    nav.createViewContext('manager', obj);
    res.status(200).render('checkpage', obj);

});

checkRouter.post('/Manager/:id/check', (req, res, next) => {
    req.db.query('select * from Record where Onum=?',[req.body.Onum], (err, results) => {
        if (err) next(err);
        var obj = new Object();
        nav.createViewContext('manager', obj);
        var items = {
            rows: results
        }

        Object.assign(obj, items);
        console.log(obj);
        res.render('check', obj);

    });
});

module.exports = checkRouter;