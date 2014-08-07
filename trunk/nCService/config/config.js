
/*
 * Config variable
 */
var config = {};

/*
 * Web server data
 */
config.web = {};
config.web.port = process.env.PORT || 8081;

/*
 * MySQL config data
 */
config.mysql = {};
config.mysql.enable = 'false';
config.mysql.host = 'localhost';
config.mysql.database = 'nCService';
config.mysql.user = 'ncservice';
config.mysql.password = 'mypass';
config.mysql.port = 3306;

/*
 * Programs in a text file
 * 
 * This is recommended for small list of programs
 */
config.progs = {};
config.progs.enable = 'true';
config.progs.list = new Array();

/*
 * ls
 */
config.progs.list[0] = {};
config.progs.list[0].Id = 0;
config.progs.list[0].Name = 'ls';
config.progs.list[0].Script = '/usr/bin/ls';
config.progs.list[0].Comment = 'Run ls command';

/*
 * pwd
 */
config.progs.list[1] = {};
config.progs.list[1].Id = 1;
config.progs.list[1].Name = 'pwd';
config.progs.list[1].Script = '/usr/bin/pwd';
config.progs.list[1].Comment = 'Run pwd command';

/*
 * mkdir
 */
config.progs.list[2] = {};
config.progs.list[2].Id = 2;
config.progs.list[2].Name = 'mkdir';
config.progs.list[2].Script = '/usr/bin/mkdir';
config.progs.list[2].Comment = 'Run mkdir command';

/*
 * rm
 */
config.progs.list[3] = {};
config.progs.list[3].Id = 3;
config.progs.list[3].Name = 'rm';
config.progs.list[3].Script = '/usr/bin/rm';
config.progs.list[3].Comment = 'Run rm command';

/*
 * cat
 */
config.progs.list[4] = {};
config.progs.list[4].Id = 4;
config.progs.list[4].Name = 'cat';
config.progs.list[4].Script = '/usr/bin/cat';
config.progs.list[4].Comment = 'Run cat command';



module.exports = config;





