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
      choices: ["View all Employees", "View all Departments", "View all Roles", "Add Employee", "Add Department", "Add Roles", "Update Employee Role",  "Remove Employee", "Exit"]
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
  connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON manager.id = employee.manager_id;",
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
    message: "Employee's manager?",
    name: "manager_id",
  }
  ]).then(function (res) {
    const query = connection.query(
      "INSERT INTO employee SET ?",
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
      }]).then(function(res) {
          console.log(res);
          const query = connection.query(
            //insert new department into database
              "INSERT INTO department SET ?", {
                  name: res.departmentName
              },
              function(err, res) {
                  connection.query("SELECT * FROM department", function(err, res) {
                      console.table(res);
                      start();
                  })
              }
          )
      })
}

//add role




//update role



// delete employee

