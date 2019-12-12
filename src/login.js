const express = require('express');
const nav = require('../navGenerator');
const crypt = require('crypto');

const loginRouter = express.Router();

loginRouter.get('/Employee/:id/:pwd', (req, res, next) => {
    var obj = new Object();
    let context = nav.createViewContext('employee', obj);
    req.db.query('SELECT distinct password FROM `Employee` WHERE eid=?', [req.params.id],
        (err, results) => {
            if (err) {
                return next(err);
            }
           
            //console.log("length:",results.length);

            if (results.length == 0) {
                res.send("incorrect id\n");
                res.end
            }  
            
            else if (results[0].password == crypt.createHash('md5').update(req.params.pwd).digest('hex')) {
                var obj = new Object();
                nav.createViewContext('employee', obj);
                res.render('Employee', obj);
            }

            else {
                res.send("incorrect password\n");
                res.end;
            }
        }
    );
});

loginRouter.get('/Manager/:id/:pwd', (req, res, next) => {
    var obj = new Object();
    let context = nav.createViewContext('manager', obj);
    req.db.query('SELECT distinct password FROM `Manager` WHERE mid=?', [req.params.id],
        (err, results) => {
            if (err) return next(err);

            if (results.length == 0) {
                res.send("incorrect id\n");
                res.end
            }  

            else if (results[0].password == crypt.createHash('md5').update(req.params.pwd).digest('hex')) {
                var obj = new Object();
                nav.createViewContext('manager', obj);
                res.render('Manager', obj);
            }

            else {
                res.send("incorrect password\n");
                res.end;
            }

        }
    );
});

loginRouter.get('/Chef/:id/:pwd', (req, res, next) => {
    var obj = new Object();
    let context = nav.createViewContext('chef', obj);
    req.db.query('SELECT distinct password FROM `Chef` WHERE cid=?', [req.params.id],
        (err, results) => {
            if (err) return next(err);

            if (results.length == 0) {
                res.send("incorrect id\n");
                res.end
            }  

            else if (results[0].password == crypt.createHash('md5').update(req.params.pwd).digest('hex')) {
                var obj = new Object();
                nav.createViewContext('chef', obj);
                res.render('Chef', obj);
            }

            else {
                res.send("incorrect password\n");
                res.end;
            }

        }
    );
});

module.exports = loginRouter;