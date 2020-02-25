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
exports.handler = function(event, context, callback){
  context.callbackWaitsForEmptyEventLoop = false;
  mysqlPool.getConnection(function(err, connection){
    if(err !== null) 
      return console.log(createResponse(500, {message: err})); 
    connection.query('SELECT "TEST SUCCESS" AS RESULT', function(error,results,field) {
      connection.release();
      if(error !== null) 
        return callback(null, createResponse(500, {message: error}));
      callback(null, createResponse(200, {message: results[0].RESULT}));
    });
  });
};