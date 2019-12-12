const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const config = require('./src/config');
const path = require('path');
const nav = require('./navGenerator');
const menu = require('./src/menu');
const login = require('./src/login');
const see_Employee = require('./src/see_Employee');
const register = require('./src/register');
const check = require('./src/check');
const rate = require('./src/rate');
const schedule = require('./src/schedule');
//const editRecipe = require('./src/editRecipe');

const PORT = process.env.PORT || 3000;

const app = express();

var hbs = exphbs.create({
    defaultLayout: 'main',
    extname: '.hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/asset', express.static('asset'));

//create connection
app.use((req, res, next) => {
    //console.log("request for data");
    let connection = mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.dbname
    });
    connection.connect((err) => {
        if (err) return next();
        
        req.db = connection;
        next();
    });
});

//app.use(editRecipe);
app.use(schedule);
app.use(rate);
app.use(check);
app.use(see_Employee);
app.use(register);
app.use(login);
app.use(menu);

app.get('/', function (req, res) {
    var obj = new Object();
    nav.createViewContext('viewer', obj);
    res.status(200).render('home', obj);
});

app.get('/about', function (req, res) {
    var obj = new Object();
    nav.createViewContext('viewer', obj);
    res.status(200).render('about', obj);
});

app.listen(PORT, () => {
    console.log('final project server is listening on port ' + PORT);
});

