const inquirer = require('inquirer')
const connection = require('./connection')


const mainMenu = () => {
  inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?",
      choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role", "exit"],
      name: "option"
    }
  ])
    .then(({ option }) => {
      switch (option) {
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
        default:
          program_exit();
      }
    });
};

const addDepartment = () => {
  inquirer.prompt([
    {
      type: "input",
      message: "What is the department's name?",
      name: "department_name"
    }
  ],
  ).then(data => {
    connection.query(
      `INSERT INTO department SET ?`, { name: data.department_name })
    mainMenu();
  })
}

const addRole = () => {
  connection.query("SELECT * FROM department", (err, res) => {
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
        type: "list",
        message: "What is the department of the role?",
        choices: res.map(department => department.name),
        name: "department"
      }
    ],).then(data => {
      let selectedDepartment = res.find(department => department.name === data.department)
      //find the department name that is = to the one in the res ans store it in a variable so we can get its id
      connection.query(
        `INSERT INTO role SET ?`, { title: data.role_name, salary: data.salary, department_id: selectedDepartment.id },
        function (err) {
          if (err) throw err
          mainMenu();
        }
      )
    })
  })
}


const addEmployee = () => {
  connection.query('SELECT * FROM role', (err, res) => {
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
        type: "list",
        message: "Which of the following is your employee's role?: ",
        choices: res.map(role => role.title),
        name: "role",
      },
      {
        type: "list",
        message: "What is the id of the employee's manager?",
        choices: [1,2],
        name: "manager"
      }
    ])
      .then(data => {
        let selectedEmployee = res.find(role => role.title === data.role)
        connection.query(
          `INSERT INTO employee SET ?`,
          { first_name: data.first_name, last_name: data.last_name, role_id: selectedEmployee.id, manager_id: data.manager },
          function (err) {
            if (err) throw err
              mainMenu(); }
          )
      })
      
  })
}


const updateEmployee = () => {
  connection.query("SELECT * FROM employee", (err, res) => {
    inquirer.prompt([
      {
        type: "list",
        message: "Choose from the following employee ids:",
        choices: res.map(employee => employee.id),
        name: "employee"
        //should this be a list instead? the way the other functions are- and then you'd choose from the mapped employee list?
      },
    ])
      .then(data => {
        const employeeID = data.employee
        connection.query("SELECT * FROM role", (err, res) => {
          inquirer.prompt([
            {
              type: "list",
              message: "choose from the following role ids:",
              choices: res.map(role => role.id),
              name: "role"
            },
          ])
            .then(data => {
              const roleID = data.role
              connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [roleID, employeeID]);
              mainMenu();
            })
        })
      })
  }
  )
}


const viewDepartments = () => {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err
    console.table(res)
    mainMenu();
  })

}
const viewRoles = () => {
  connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err
    console.table(res)
    mainMenu();
  })

}

const viewEmployees = () => {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err
    console.table(res)
    mainMenu();
  })

}


const program_exit = () => {
  // use this when you want to exit the script
  connection.end();
}


mainMenu();