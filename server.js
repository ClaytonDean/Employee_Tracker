const util = require("util");
const mysql = require("mysql");
const inquirer = require("inquirer")
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "employees_db"


});



// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: "start",
      type: "list",
      message: "What would you like to do?",
      choices: ["View all Employees", "View all Departments", "View all Roles", "Add Employee", "Add Department", "Add Roles", "Update Employee Role", "Remove Employee", "Exit"]
    })
    .then(function (res) {
      //switch case
      switch (res.start) {
        case "View all Employees":
          viewAllEmployees();
          break;

        case "View all Departments":
          viewAllDepartments();
          break;

        case "View all Roles":
          viewAllRoles();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Add Department":
          addDepartment();
          break;

        case "Add Roles":
          addRoles();
          break;

        case "Update Employee Role":
          updateEmployees();
          break;

        case "Remove Employee":
          removeEmployees();
          break;

        case "Exit":
          connection.end();
          break;

      }

    });
}
//view all employee function
function viewAllEmployees() {

  //schema joins 
  connection.query("SELECT employees.id, employees.first_name, employees.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees LEFT JOIN role ON employees.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employees AS manager ON manager.id = employees.manager_id;",
    function (err, res) {
      if (err) throw err;

      console.table(res);
      start();
    });
}
//view all Departments
function viewAllDepartments() {

  //schema selection
  connection.query("SELECT * FROM department",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      start();
    });
}
//view all roles
function viewAllRoles() {

  //schema select all role titles, salary, department_id, and name
  connection.query("SELECT role.*, department.name FROM role LEFT JOIN department ON department.id = role.department_id",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      start();
    });
}

// add employee
function addEmployee() {
  //prompt
  inquirer.prompt([{
    type: "input",
    message: "Employee's first name?",
    name: "first_name",
  },
  {
    type: "input",
    message: "Employee's last name?",
    name: "last_name",
  },
  {
    type: "list",
    message: "Employee's role?",
    name: "role_id",
    choices:
      [1, 2, 3]
  },
  {
    type: "input",
    message: "Employee's manager( Use manager ID)?",
    name: "manager_id",
  }
  ]).then(function (res) {
    const query = connection.query(
      "INSERT INTO employees SET ?",
      res,
      function (err, res) {
        if (err) throw err;
        console.log("Successfully Added Employee");
        start();
      }
    );
  })
}
//adding new Department
function addDepartment() {
  //prompt
  inquirer
    .prompt([{
      type: "input",
      name: "departmentName",
      message: "Which Department would you like to add?"
    }]).then(function (res) {
      console.log(res);
      const query = connection.query(
        //insert new department into database
        "INSERT INTO department SET ?", {
        name: res.departmentName
      },
        function (err, res) {
          connection.query("SELECT * FROM department", function (err, res) {
            console.table(res);
            start();
          })
        }
      )
    })
}

//add role
function addRoles() {
  let departments = []
  connection.query("SELECT * FROM department",
    function (err, res) {
      if (err) throw err;
      //loop through first and last name response id's and push departments for corresponding roles
      for (let i = 0; i < res.length; i++) {
        res[i].first_name + " " + res[i].last_name
        departments.push({ name: res[i].name, value: res[i].id });
      }
      //prompt
      inquirer.prompt([{
        type: "input",
        name: "title",
        message: "What role would you like to add?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary?",
      },
      {
        type: "list",
        name: "department",
        message: "What is the department?",
        choices: departments
      },
        //insert schema 
      ]).then(function (res) {
        console.log(res);
        const query = connection.query(
          "INSERT INTO role SET ?", {
          title: res.title,
          salary: res.salary,
          department_id: res.department
        },
          function (err, res) {
            if (err) throw err;
            start();
          }
        )
      })
    })
}



//update role
function updateEmployees() {
  // connection.query("SELECT first_name, last_name, id FROM employees",
  //   function (err, res) {
    
      // let employees = res.map(employees => ({
      //   name: employees.first_name + " " + employees.last_name,
      //   value: employees
      // }))
      inquirer.prompt([{
        type: "input",
        name: "employeeName",
        message: "Which Employee are you updating?",
        // choices: employees
      },
      {
        type: "input",
        name: "role",
        message: "What is the new role ID",
      },
      ]).then(function (res) {
        connection.query("UPDATE employees SET role_id = ? WHERE first_name = ?", [res.role, res.employeeName],
          function (err, res) {
            if (err) throw err;
            console.log(res);

            start();

          }
        );
      })
    // }
  // )
}


// delete employee

function removeEmployees() {
  let employeesList = []
  connection.query("SELECT employees.first_name, employees.last_name FROM employees",
    (err, res) => {
      if (err) throw err;

      for (let i = 0; i < res.length; i++) {
        employeesList.push(res[i].first_name + " " + res[i].last_name);
      }

      inquirer.prompt([{
        type: "list",
        name: "employeeName",
        message: "Which Employee are you removing?",
        choices: employeesList
      },
      ]).then(function (res) {
        connection.query(`DELETE FROM employees WHERE concat(first_name, ' ', last_name) = "${res.employeeName}"`,
          function (err, res) {
            if (err) throw err;
            console.log("Employee deleted");
            
            start();
          });
      });

    }
  );
};
