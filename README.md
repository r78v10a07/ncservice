# A NodeJS based webservices

This is a simple NodeJS based application that allows external applications 
execute programs in the server via URL. This is a kind of webservice developed 
in javascript that uses a configuration file or a MySQL database with the 
programs to be executed.

The MySQL is disable by default.

The file in ./config/config.js is used to setup all the configurations. 

The default page ("/") shows the list of programs available.

The page "/prog/:id", where :id is the program's id in the MySQL database, 
shown the data for that specific program.
 
The page "/exec" execute the program with the arguments. The server use GET
to pass the program's id and arguments. For example to execute ls -l in /tmp
directory the URL should be: /exec?id=1&arg=-l%20/tmp

The exec service include three more options. The first one is async=true to send 
the program and return immediately without wait for the result. The second 
option is text=true to send the program's output in text format and the last option is rel=5, just for the html output, and will reload the page after 5 seconds

The exec full format is:

```
/exec?id=1&dir=-l%20/tmp&async=false&text=false&rel=5
```

The reload option is useful for programs like ps to have an update of the page every 5 seconds.

For complex programs with multiple arguments you should create scripts

## EXAMPLES

<img src="https://ncservice.googlecode.com/svn/wiki/server.jpg"/>

<img src="https://ncservice.googlecode.com/svn/wiki/server1.jpg"/>

### From the linux console

You can get the command output in text format in the linux console using *wget* like this:

#### ls /tmp

```
#> wget -qO- "http://localhost:8081/exec?id=0&arg=-lh%20/tmp&text=true"
```

#### ps aux | grep username and reload after 5 seconds

```
#> wget -qO- "http://localhost:8081/exec?id=5&arg=aux|grep username&text=true&rel=5"
```

## NOTES

Please, be careful with the programs included to be executed and the user who
will runs this application. I recommend the creation of a user with limited 
permissions. Also, the application should be executed in a protected port.

## INSTALATION

### Application source code and NodeJS dependencies

Getting the source code, and download the NodeJS dependencies:

```
#> svn checkout http://ncservice.googlecode.com/svn/trunk/nCService
#> cd  nCService
#> npm install
```

### Config file

By default the programs are specified in the ./config/config.js file.

```
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
```

### MySQL (Optional)

Create a database named 'nCService' and a mysql user named 'ncservice'

```
#> mysql -p -u root
mysql> CREATE DATABASE nCService;
mysql> CREATE USER 'ncservice'@'localhost' IDENTIFIED BY 'mypass';
mysql> GRANT ALL ON nCService.* TO 'ncservice'@'localhost' IDENTIFIED BY 'mypass';
#> mysql -p -u ncservice nCService < ./mysql/nCService.sql
```

## RUN

Run this command to execute the application:

```
#> node nCService.js
 Express nCService server listening on port 8081
```
