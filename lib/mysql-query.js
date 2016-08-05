/*jsl:declare global */
// mysql-query.js (c) 2014 Oleg Cherniy and other contributors
// May be freely distributed under the MIT license.
// For further details and documentation:
// http://github.com/ApelSYN/node-mysql-query

var pool = require('./pool');

var defaultConnectionName = 'master';

function query(/* args, [connection_name,] callback */) {
  var args = [].slice.call(arguments),
      callback = args.pop(),
      connectionName;

  if (args.length > 1 && typeof args[args.length - 1] == 'string') {
    connectionName = args.pop();
  } else {
    connectionName = defaultConnectionName;
  }

  function makeQuery() {
    /* args */
    pool.getConnection(connectionName, function (err, connection) {
      if (err) {
        if (err.message === 'Pool does Not exists.') {
          pool.restartNode(connectionName);
        }
        throw err;
      }

      args.push(function (/* err, ... results */) {
        if (connection.release) {
          connection.release();
        } else {
          connection.end();
        }
        callback.apply(null, arguments);
      });
      connection.query.apply(connection, args)
    });
  }

  makeQuery();
}

query.pool = pool;

module.exports = query;


