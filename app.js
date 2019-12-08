const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const config = require('./src/config');
const path = require('path');
const navGenerator = require('./navGenerator');
const PORT = process.env.PORT || 3000;

const app = express();

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, "views"));

app.use('/update', express.static('src'));//all sql in src

//create connection
app.use((req, res, next) => {
    console.log("request for menu");
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

app.use('/menu', require('./menu.js'));
app.use('/login', require('./login.js'));
app.use('/see_Employee', require('./see_Employee.js'));
app.use('/register', require('./register.js'));
app.use('/check',require('CheckRecord.js'));
app.use('/rate', require('rate.js'));
app.use('/schedule', require('schedule.js'));
app.use('/editRecipe', require('editRecipe.js'));
app.get('/', function (req, res) {
    res.status(200).render(navGenerator('viewer'));
});

app.listen(PORT, () => {
    console.log('final project server is listening on port ' + PORT);
});