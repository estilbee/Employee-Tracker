const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "Root831!",
  database: "employee_tracker"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!\n\n\n");
});

module.exports = connection;

