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
  
  