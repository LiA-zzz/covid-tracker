const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 3000;
const connection = mysql.createConnection({
  host: "localhost",
  user: "test_user",
  password: "password",
  database: "covid_data",
});

connection.connect();

connection.query("SELECT * FROM country", function (err, rows, fields) {
  if (err) throw err;

  console.log(rows, fields);
});

connection.end();
