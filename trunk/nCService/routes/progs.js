
/*
 * GET programs
 */

exports.list = function(req, res) {

    req.getConnection(function(err, connection) {
        var query = connection.query('SELECT * FROM Progs', function(err, rows) {
            if (err)
                console.log("Error Selecting : %s ", err);

            res.render('list', {title: "nCService Backend", data: rows});
        });
    });
};

/*
 *  GET one program
 */

exports.get = function(req, res) {
    var id = req.params.id;

    req.getConnection(function(err, connection) {
        var query = connection.query('SELECT * FROM Progs WHERE Id = ?', id, function(err, rows) {
            if (err)
                console.log("Error Selecting : %s ", err);

            res.render('list', {title: "nCService Backend", data: rows});
        });
    });
};

/*
 *  Execute one program
 */

exports.exec = function(req, res) {
    var exec = require('exec');
    var id = req.param("id");
    var arg = req.param("arg");
    var async = req.param("async");
    var text = req.param("text");

    if (id && arg) {
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
                            res.render('progs', {title: "nCService Backend", data: rows, arg: arg, stdout: stdout});
                        }
                    }
                });
                if (async === "true") {
                    if (text !== "true") {
                        res.render('progs', {title: "nCService Backend", data: rows, arg: arg, stdout: chroot + "/" + arg});
                    }
                }
            });
        });
    } else {
        res.render('error', {title: "nCService Backend Error!!", error: "Pass by GET id and dir name (?id=1&arg=abrj)"});
    }
};
