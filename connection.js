const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "code",
  database: "employee_tracker"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!\n\n\n");
});

module.exports = connection;

