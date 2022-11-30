const inquirer = require('inquirer')
const connection = require('./connection')


const mainMenu = () => {
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
  
  mainMenu();

  const addDepartment = () => {
    inquirer.prompt([
        {
          type: "input",
          message: "What is the department's name?",
          name: "department_name"
        }
      ],
      ) .then(data => {
   connection.query(
    `INSERT INTO department SET ?`, {name:data.department_name})
    mainMenu(); })
    }

  const addRole = () => {
    connection.query("SELECT * FROM department", (err,res) => {
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
      ],) .then(data => { 
        let selectedDepartment = res.find(department => department.name === data.department)
        //find the department name that is = to the one in the res ans store it in a variable so we can get its id
   connection.query(
    `INSERT INTO role SET ?`, {title:data.role_name, salary:data.salary, department_id:selectedDepartment.id})
    
})
})  
  }

  const testAddEmployee = () => {
    connection.query ('SELECT * FROM role', (err,res) => {
        //inquirer prompt in here *follow the way addRole looks
        //map role => role.title (instead of department.name) for role choices
        //.then convert chosen role title to its id on INSERT INTO SET
    })
  }


  const addEmployee = () => {
    connection.query ('SELECT * FROM role', (err,res) => {
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
            message: res.map(role => role.title),
            name: "role"
        },
        {
            type: "input",
            message: "Who is the employee's manager?",
            name: "manager"
        }
      ])
      .then(data => { 
        let selectedEmployee = res.find(department => department.name === data.department)
      return connection.query(
        `INSERT INTO employee SET ?`, 
        //missing {with employee data}
        {first_name:data.first_name, last_name:data.last_name, role_id:selectedEmployee.id})
    
        })
    })
  }

  const viewDepartments = () => {
    connection.query ("SELECT * FROM department", (err,res) => {
        if (err) throw err
        console.table(res)
        mainMenu();
    } )

  }
  const viewRoles = () => {
    connection.query ("SELECT * FROM role", (err,res) => {
        if (err) throw err
        console.table(res)
        mainMenu();
    } )

  }

  const viewEmployees = () => {
    connection.query ("SELECT * FROM employee", (err,res) => {
        if (err) throw err
        console.table(res)
        mainMenu();
    } )

  }

  
  const program_exit = () =>{
    // use this when you want to exit the script
    connection.end();
  }