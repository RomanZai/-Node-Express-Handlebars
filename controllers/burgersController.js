var express = require("express");

var router = express.Router();

var burger = require("../models/burger.js");


router.get("/", function (req, res) {
  burger.all().then(function (data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function (req, res) {
  burger.create(["name", "devoured"], [req.body.name, req.body.devoured]).then(function (result) {

    res.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.update(
    {
      devoured: req.body.devoured
    },
    condition)
    .then(
      function (result) {
        if (result.changedRows === 0) {

          return res.status(404).end();
        }
        res.status(200).end();

      }
    );
});


module.exports = router;
