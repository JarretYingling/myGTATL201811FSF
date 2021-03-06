"use strict";

// Dependencies
const express = require("express");

const mysql = require("mysql");
// require dotenv for local environemnt variables
const dotenv = require("dotenv")
  .config({
    //symlink git = /Users/macos_highsierra_ss/git
    path: "git/.env"
  });
// dotenv error handling
if (dotenv.error) throw dotenv.error

// Create express app instance.
var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// MySQL DB Connection Information (remember to change this with our specific credentials)
var connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: "seinfeld_db"
});

// Initiate MySQL Connection.
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log(`id ${connection.threadId} connected on port ${process.env.MYSQL_PORT}`);
});

// Routes
app.get("/cast", function (req, res) {

  // If the main route is hit, then we initiate a SQL query to grab all records.
  // All of the resulting records are stored in the variable "result."
  connection.query("SELECT * FROM actors ORDER BY id", function (err, result) {

    // We then begin building out HTML elements for the page.
    var html = "<h1>Actors by id</h1>";

    // Here we begin an unordered list.
    html += "<ul>";

    // We then use the retrieved records from the database to populate our HTML file.
    for (var i = 0; i < result.length; i++) {
      html += "<li>"
      html += "<p>ID: " + result[i].id + "</p>";
      html += "<p>Name: " + result[i].first_name + "</p>";
      html += "<p>Coolness: " + result[i].coolness_points + "</p>";
      html += "<p>Attitude: " + result[i].attitude + " </p>"
      html += "</li>";
    }

    // We close our unordered list.
    html += "</ul>";

    // Finally we send the user the HTML file we dynamically created.
    res.send(html);
  });
});

// Routes
app.get("/coolness-chart", function (req, res) {

  // If the main route is hit, then we initiate a SQL query to grab all records.
  // All of the resulting records are stored in the variable "result."
  connection.query("SELECT * FROM actors ORDER BY coolness_points DESC", function (err, result) {

    // We then begin building out HTML elements for the page.
    var html = "<h1>Actors by coolness_points</h1>";

    // Here we begin an unordered list.
    html += "<ul>";

    // We then use the retrieved records from the database to populate our HTML file.
    for (var i = 0; i < result.length; i++) {
      html += "<li>"
      html += "<p>ID: " + result[i].id + "</p>";
      html += "<p>Name: " + result[i].first_name + "</p>";
      html += "<p>Coolness: " + result[i].coolness_points + "</p>";
      html += "<p>Attitude: " + result[i].attitude + " </p>"
      html += "</li>";
    }

    // We close our unordered list.
    html += "</ul>";

    // Finally we send the user the HTML file we dynamically created.
    res.send(html);
  });
});

app.get("/attitude-chart/:att", function (req, res) {

  // If the main route is hit, then we initiate a SQL query to grab all records.
  // All of the resulting records are stored in the variable "result."
  // Routes
  connection.query("SELECT * FROM actors WHERE ?",
    [{
      attitude: req.params.att
    }],
    function (err, result) {

      // We then begin building out HTML elements for the page.
      var html = "<h1>Actors by attitude</h1>";

      // Here we begin an unordered list.
      html += "<ul>";

      // We then use the retrieved records from the database to populate our HTML file.
      for (var i = 0; i < result.length; i++) {
        html += "<li>"
        html += "<p>ID: " + result[i].id + "</p>";
        html += "<p>Name: " + result[i].first_name + "</p>";
        html += "<p>Coolness: " + result[i].coolness_points + "</p>";
        html += "<p>Attitude: " + result[i].attitude + " </p>"
        html += "</li>";
      }

      // We close our unordered list.
      html += "</ul>";

      // Finally we send the user the HTML file we dynamically created.
      res.send(html);
    });
});

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function () {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});