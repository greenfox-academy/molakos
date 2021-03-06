"use strict"

var express = require("express");
var bodyParser = require("body-parser");
var items = require("./items.js");
// var users = require("./user.js");


var app = express();

// items.add({text: 'Buy milk'});
// items.add({text: 'Make dinner'});
// items.add({text: 'Save the world'});


app.use(logRequest);
app.use(express.static("public"));
app.use(bodyParser.json());


app.get("/todos", function (req, res) {
  items.all(function(result) {
    res.json(result);
  });
});


app.post("/todos", function (req, res) {
  var item = items.add(req.body);
  res.status(201).json(item);
});


app.get("/todos/:id", function (req, res) {
  var id = parseInt(req.params.id);
  items.getItem(id, function(item) {
    res.status(200).json(item);
  });
});


app.delete("/todos/:id", function (req, res) {
  items.remove(req.params.id);
  item.destroyed = true;
  res.status(200).send('OK');
});


app.put("/todos/:id", function (req, res) {
  findItem(req, res, function (item) {
    item.update(req.body);
    res.json(item);
  });
});

app.listen(3000, function () {
  console.log("Listening on port 3000...")
});

function findItem(req, res, found) {
  var id = req.params.id;
  var item = items.get(id);
  if (item) {
    found(item);
  } else {
    res.status(404).json({error: "Item not found"})
  }
}

function logRequest(req, res, next) {
  var parts = [
    new Date(),
    req.method,
    req.originalUrl,
  ];
  console.log(parts.join(" "));

  next();
}
