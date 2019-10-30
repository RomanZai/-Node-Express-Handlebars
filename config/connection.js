var mysql = require("mysql");
var connection;

if (process.env.JAWSDB_URL){
    connection = mysql.createConnection(process.env.JAWSDB_URL);
}else{
    connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "root",
        database: "burger_db"
    })

    }

const connectionPromise = new Promise((resolve, reject) => {
    connection.connect(function (err) {
        if (err) {
            return reject(err);
        };
        resolve(connection);
    });
});

function getConnection() {
    return connectionPromise;
}

module.exports = {
    getConnection
};
