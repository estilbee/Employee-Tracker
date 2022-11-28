const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  // Your username
  user: "root",
  // Your password
  password: "rootroot",
  database: "airline_db"
});

connection.connect(function (err) {
  if (err) throw err;
  // console.log("Connected!!!\n\n\n");
});

module.exports = connection;