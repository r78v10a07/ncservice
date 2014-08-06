/**
 * Module dependencies.
 */
var express = require('express');
var http = require('http');
var path = require('path');
var morgan = require('morgan');
var st = require('st');
var errorhandler = require('errorhandler');

//load customers route
var progs = require('./routes/progs');
var config = require('./config/config');
var app = express();
var connection = require('express-myconnection');
var mysql = require('mysql');

// all environments
app.set('env');
app.set('port', config.web.port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(morgan('combined'));
app.use('/public', st("./public"));

// development only
if ('development' === app.get('env')) {
    app.use(errorhandler());
}

app.use(
        connection(mysql, {
            host: config.mysql.host,
            user: config.mysql.user,
            password: config.mysql.password,
            port: config.mysql.port,
            database: config.mysql.database
        }, 'request')
        );

app.get('/', progs.list);
app.get('/prog/:id', progs.get);
app.get('/exec', progs.exec);

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express nCService server listening on port ' + app.get('port'));
});