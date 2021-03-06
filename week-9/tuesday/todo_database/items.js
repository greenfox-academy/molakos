"use-strict"

var mysql = require('mysql');

var connection = mysql.createConnection({
  host : 'localhost',
  user : 'test',
  password : 'test',
  database : 'todo'
});

connection.connect();

var TodoItem = function () {
  this.id = nextId();
  this.text = "";
  this.completed = false;
}

TodoItem.prototype.update = function(attributes) {
  this.text = attributes.text || "";
  this.completed = !!attributes.completed;
};

var currId = 0;
function nextId() {
  return ++currId;
}

var items = {};

function getItem(id, callback) {
  connection.query('SELECT id, text, completed FROM todo WHERE id=?', id, function(err, result) {
    if (err) throw err;
    var item = result[0];
    callback(item);
  });
}

function addItem(attributes) {
  connection.query('INSERT INTO todo SET ?', attributes, function(err, result) {
    if (err) throw err;
    console.log(result.insertId);
  });
}

function removeItem(id) {
  connection.query('DELETE FROM todo WHERE id=?', id, function(err, result) {
    if (err) throw err;
  });
}

function allItems(callback) {
  connection.query('SELECT * FROM todo', function(err, result) {
    if (err) throw err;
    callback(result);
  });
}

function updateItem(id) {
  connection.query("UPDATE todo SET completed='true' WHERE id=?", id, function(err, result) {
    if (err) throw err;
  });
}

module.exports = {
  getItem: getItem,
  add: addItem,
  remove: removeItem,
  all: allItems,
  update: updateItem
};
