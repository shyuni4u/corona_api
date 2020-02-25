const mysql     = require('mysql');
const config    = require('./config.json');
const mysqlPool = mysql.createPool ({ 
    host    : config.npd.host, 
    user    : config.npd.user,
    password: config.npd.password,
    database: config.npd.database,
    connectionLimit : 60
});
const createResponse = (status, body) => ({
    statusCode: status,
    body: JSON.stringify(body)
  });
mysqlPool.getConnection(function(err, connection){
    if(err !== null)
        return console.log(createResponse(500, {message: err}));
    connection.query('SELECT "TEST" AS RESULT', function(error,results,field) {
        connection.release();
        if(error !== null) 
            return console.log(createResponse(500, {message: error}));
        console.log(createResponse(200, {message: results[0].RESULT}));
    });
});