const inquirer = require('inquirer')
const connection = require('./connection')


const mainmenu = () => {
    return inquirer.prompt([
      {
        type: "list",
        message: "What would you like to do?",
        choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update employee role", "exit"],
        name: "option"
      }
    ])
    .then(({option}) => {
      switch(option){
        case "exit":
          return program_exit();
        case "view all departments":
          viewDepartments();
          break;
        case "view all roles":
          viewRoles();
          break;
        case "view all employees":
            viewEmployees();
            break;
        case "add a department":
            addDepartment();
            break;
        case "add a role":
            addRole();
            break;
        case "add an employee":
            addEmployee();
            break;
        case "update an employee role":
            updateEmployee();
            break;
      }
    });
  };
  
  mainmenu();

  const addDepartment = () => {
  
    return connection.query(
    `INSERT INTO department SET ?`,
     inquirer.prompt([
        {
          type: "input",
          message: "What is the department's name?",
          name: "department_name"
        }
      ],
      function (err, result) {
        if (err) {
          console.log(err);
        }
        console.log(result);
        mainmenu();
      })
    
  )}

  const addRole = () => {
  
    return connection.query(
    `INSERT INTO role SET ?`,
     inquirer.prompt([
        {
          type: "input",
          message: "What is the name of the role?",
          name: "role_name"
        },
        {
            type: "input",
            message: "What is the salary of the role?",
            name: "salary"
        },
        {
            type: "input",
            message: "What is the department of the role?",
            name: "department"
        }
      ],
      function (err, result) {
        if (err) {
          console.log(err);
        }
        console.log(result);
        mainmenu();
      })
  )}

  const addEmployee = () => {
  
    return connection.query(
    `INSERT INTO employee SET ?`,
     inquirer.prompt([
        {
          type: "input",
          message: "What is the first name of the employee?",
          name: "first_name"
        },
        {
            type: "input",
            message: "What is the last name of the employee?",
            name: "last_name"
        },
        {
            type: "input",
            message: "What is the employee's role?",
            name: "role"
        },
        {
            type: "input",
            message: "Who is the employee's manager?",
            name: "manager"
        }
      ],
      function (err, result) {
        if (err) {
          console.log(err);
        }
        console.log(result);
        mainmenu();
      })
  )}


  
  const program_exit = () =>{
    // use this when you want to exit the script
    connection.end();
  }