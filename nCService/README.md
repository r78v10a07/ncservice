nCService
==============

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

The exec service include two more options. The first one is async=true to send 
the program and return immediately without wait for the result. The second 
option is text=true to send the program's output in text format.

The exec full format is:

/exec?id=1&dir=-l%20/tmp&async=true&text=true

For complex programs with multiple arguments you should create scripts 

NOTES

Please, be careful with the programs included to be executed and the user who
will runs this application. I recommend the creation of a user with limited 
permissions. Also, the application should be executed in a port in a protected network.

INSTALATION

NodeJS:

Run this command to download the nodejs modules.

#> npm install 

MySQL (Optional):
Create a database named 'nCService' and a mysql user named 'ncservice'

#> mysql -p -u root
mysql> CREATE DATABASE nCService;
mysql> CREATE USER 'ncservice'@'localhost' IDENTIFIED BY 'mypass';
mysql> GRANT ALL ON nCService.* TO 'ncservice'@'localhost' IDENTIFIED BY 'mypass';

RUN

Run this command to execute the application:

#> mysql -p -u ncservice nCService < ./mysql/nCService.sql 
#> node nCService.js
Express nCService server listening on port 8081

CREDITS:

Author: Roberto Vera Alvarez
E-mail: R78v10a07@gmail.com
