
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
config.progs.list[0].Script = 'ls';     // Full path for programs which are not in the global PATH
config.progs.list[0].Comment = 'Run ls command';

/*
 * pwd
 */
config.progs.list[1] = {};
config.progs.list[1].Id = 1;
config.progs.list[1].Name = 'pwd';
config.progs.list[1].Script = 'pwd';
config.progs.list[1].Comment = 'Run pwd command';

/*
 * mkdir
 */
config.progs.list[2] = {};
config.progs.list[2].Id = 2;
config.progs.list[2].Name = 'mkdir';
config.progs.list[2].Script = 'mkdir';
config.progs.list[2].Comment = 'Run mkdir command';

/*
 * rm
 */
config.progs.list[3] = {};
config.progs.list[3].Id = 3;
config.progs.list[3].Name = 'rm';
config.progs.list[3].Script = 'rm';
config.progs.list[3].Comment = 'Run rm command';

/*
 * cat
 */
config.progs.list[4] = {};
config.progs.list[4].Id = 4;
config.progs.list[4].Name = 'cat';
config.progs.list[4].Script = 'cat';
config.progs.list[4].Comment = 'Run cat command';

/*
 * ps
 */
config.progs.list[5] = {};
config.progs.list[5].Id = 5;
config.progs.list[5].Name = 'ps';
config.progs.list[5].Script = 'ps';
config.progs.list[5].Comment = 'Run ps command';

/*
 * gsutil
 */
config.progs.list[6] = {};
config.progs.list[6].Id = 6;
config.progs.list[6].Name = 'gsutil';
config.progs.list[6].Script = 'gsutil';
config.progs.list[6].Comment = 'Run gsutil command';

/*
 * echo
 */
config.progs.list[7] = {};
config.progs.list[7].Id = 7;
config.progs.list[7].Name = 'echo';
config.progs.list[7].Script = 'echo';
config.progs.list[7].Comment = 'Run echo command';

/*
 * uptime
 */
config.progs.list[8] = {};
config.progs.list[8].Id = 8;
config.progs.list[8].Name = 'uptime';
config.progs.list[8].Script = 'uptime';
config.progs.list[8].Comment = 'Run uptime command';

/*
 * LOCAL SCRIPTS
 */

/*
 * Script to execute from Google Cloud Storage
 */
config.progs.list[9] = {};
config.progs.list[9].Id = 9;
config.progs.list[9].Name = 'runFromGCS';
config.progs.list[9].Script = './scripts/runFromGCS.sh';
config.progs.list[9].Comment = 'Run runFromGCS local script';


module.exports = config;





