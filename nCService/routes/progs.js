
var config = require('../config/config');
var status = "FREE";

/*
 * GET programs
 */

exports.list = function(req, res) {
    if (config.mysql.enable === 'true') {
        req.getConnection(function(err, connection) {
            var query = connection.query('SELECT * FROM Progs', function(err, rows) {
                if (err)
                    console.log("Error Selecting : %s ", err);

                res.render('list', {title: "nCService Backend", reload: "", data: rows});
            });
        });
    } else if (config.progs.enable === 'true') {
        res.render('list', {title: "nCService Backend", reload: "", data: config.progs.list});
    } else {
        res.render('error', {title: "nCService Backend Error!!", reload: "", error: "In config file: config.mysql or config.progs should be enable"});
    }
};

/*
 *  GET one program
 */

exports.get = function(req, res) {
    var id = req.params.id;
    if (config.mysql.enable === 'true') {
        req.getConnection(function(err, connection) {
            var query = connection.query('SELECT * FROM Progs WHERE Id = ?', id, function(err, rows) {
                if (err)
                    console.log("Error Selecting : %s ", err);

                res.render('prog', {title: "nCService Backend", reload: "", data: rows[0]});
            });
        });
    } else if (config.progs.enable === 'true') {
        res.render('prog', {title: "nCService Backend", reload: "", data: config.progs.list[id]});
    } else {
        res.render('error', {title: "nCService Backend Error!!", reload: "", error: "In config file: config.mysql or config.progs should be enable"});
    }
};

/*
 *  Execute one program
 */

exports.exec = function(req, res) {
    var exec = require('child_process').exec;
    var id = req.param("id");
    var arg = req.param("arg");
    var async = req.param("async");
    var text = req.param("text");
    var reload = req.param("rel");

    if (reload !== "" || reload !== "0") {
        reload = "<META HTTP-EQUIV=\"refresh\" CONTENT=\"" + reload + "\">";
    } else {
        reload = "";
    }

    if (id && arg) {
        if (config.mysql.enable === 'true') {
            req.getConnection(function(err, connection) {
                var query = connection.query('SELECT * FROM Progs WHERE Id = ?', id, function(err, rows) {
                    if (err)
                        console.log("Error Selecting : %s ", err);

                    if (text === "true") {
                        res.writeHead(200, {'Content-Type': 'text/plain'});
                    }

                    var child = exec(rows[0].Script + " " + arg, function(error, stdout, stderr) {
                        if (async !== "true") {
                            if (text === "true") {
                                res.end(stdout);
                            } else {                                
                                res.render('exec', {title: "nCService Backend", reload: reload, data: rows[0], arg: arg, stdout: stdout, stderr: error});
                            }
                        }
                    });
                    if (async === "true") {
                        if (text !== "true") {
                            res.render('exec', {title: "nCService Backend", reload: reload, data: rows[0], arg: arg, stdout: "Command " + rows[0].Name, stderr: ""});
                        }                        
                    }
                });
            });
        } else if (config.progs.enable === 'true') {
            if (text === "true") {
                res.writeHead(200, {'Content-Type': 'text/plain'});
            }

            var child = exec(config.progs.list[id].Script + " " + arg, function(error, stdout, stderr) {
                if (async !== "true") {                    
                    if (text === "true") {
                        res.end(stdout);
                    } else {                        
                        res.render('exec', {title: "nCService Backend", reload: reload, data: config.progs.list[id], arg: arg, stdout: stdout, stderr: error});
                    }
                }
            });
            if (async === "true") {
                if (text !== "true") {
                    res.render('exec', {title: "nCService Backend", reload: reload, data: config.progs.list[id], arg: arg, stdout: "Command " + config.progs.list[id].Name, stderr: ""});
                }                
            }
        } else {
            res.render('error', {title: "nCService Backend Error!!", reload: reload, error: "In config file: config.mysql or config.progs should be enable"});
        }
    } else {
        res.render('error', {title: "nCService Backend Error!!", reload: reload, error: "Pass by GET id and dir name (?id=1&arg=abrj)"});
    }
};

/*
 * Get and set the server status
 */
exports.status = function(req, res) {
    var id = req.params.id;
    res.writeHead(200, {'Content-Type': 'text/plain'});
    if (id){
        status = id;
    }
    res.end(status);
};
