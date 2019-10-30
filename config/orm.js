
var connection = require("./promisify-mysql.js");

function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

function objToSql(ob) {
  var arr = [];

  for (var key in ob) {
    var value = ob[key];
  
    if (Object.hasOwnProperty.call(ob, key)) {

      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }

      arr.push(key + "=" + value);
    }
  }

  return arr.toString();
}

var orm = {
  all: function(tableInput) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    return connection.query(queryString);
  },
  create: function(table, cols, vals) {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    return connection.query(queryString, vals);
  },
  // An example of objColVals would be {name: panther, sleepy: true}
  update: function(table, objColVals, condition) {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    return connection.query(queryString);
  },
};

// Export the orm object for the model (cat.js).
module.exports = orm;
