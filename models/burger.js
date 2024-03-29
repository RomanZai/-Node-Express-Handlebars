// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var burger = {
  all: function() {
    return orm.all("burgers");
  },
  // The variables cols and vals are arrays.
  create: function(cols, vals) {
    return orm.create("burgers", cols, vals);
  },
  update: function(objColVals, condition) {
    return orm.update("burgers", objColVals, condition);
  },
};

// Export the database functions for the controller (catsController.js).
module.exports = burger;
