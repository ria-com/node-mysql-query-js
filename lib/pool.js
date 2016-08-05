var mysql = require('mysql'),
    config = require('config'),
    database = config.database,
    poolCluster = mysql.createPoolCluster(),
    timeoutId = 0,
    restartTimeout = config.databasePool ? config.databasePool.restartTimeout || 1000 : 1000;

for (var connection_name in database) {
    poolCluster.add(connection_name, database[connection_name]);
}

poolCluster.restartNode = function (connectionName) {
    if (!timeoutId) {
        timeoutId = setTimeout(function () {
            poolCluster.add(connectionName, database[connectionName]);
            timeoutId = 0;
        }, restartTimeout)
    }
};

module.exports = poolCluster;