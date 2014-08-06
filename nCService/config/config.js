
/*
 * Config variable
 */
var config = {};

/*
 * MySQL config data
 */
config.mysql = {};
config.mysql.host = 'localhost';
config.mysql.database = 'nCService';
config.mysql.user = 'ncservice';
config.mysql.password = 'mypass';
config.mysql.port = 3306;

/*
 * Web server data
 */
config.web = {};
config.web.port = process.env.PORT || 8081;

module.exports = config;





