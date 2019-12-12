const express = require('express');
const nav = require('../navGenerator');

const menuRouter = express.Router();

menuRouter.get('/menu', (req, res, next) => {
    req.db.query('SELECT price,menu_description from Recipe', (err, results) => {
        if (err) return next(err);
        var obj = new Object();
        nav.createViewContext('viewer', obj);
        var items = {
            rows:results
        }
        
        Object.assign(obj, items);
        
        res.render('menu', obj);

    });

});

menuRouter.post('/menu', (req, res, next) => {
    var obj = new Object();
    nav.createViewContext('viewer', obj);
    console.log(req.body.rid);

    req.db.query('SELECT distinct iid, amount from Ingredient as I, Recipe as R, `use` as U where U.rid =? and U.iid = I.iid',
        [req.body.rid], (err, results) => {
            if (err) return next(err);

            var items = {
                rows: results
            }

            Object.assign(obj, items);
            console.log(obj);
            res.render('ingredientlist', obj);

    });

})

module.exports = menuRouter;