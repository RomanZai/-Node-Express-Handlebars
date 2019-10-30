const { getConnection } = require("./connection");

async function query(...inputs) {

    const connection = await getConnection();
    return new Promise((resolve, reject) => {
    connection.query(...inputs, 
        function(err, results) {
          if (err) return reject(err);
          resolve(results);
        }
      );
    })
}

async function end() {

    const connection = await getConnection();
    return connection.end();
}

module.exports = {
    query,
    end
}