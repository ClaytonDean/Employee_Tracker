const util = require("util");
const mysql = require("mysql");
const inquirer = require("inquirer")
const connection = mysql.createConnection({
  host: "localhost",
  // Your username
  user: "root",
  // Your password
  password: "root",
  database: "employees_db"

  
});



// connect to the mysql server and sql database
connection.connect(function(err) {
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
      choices: ["Add Employee", "View all Employees", "Remove Employee", "Add Department", "View all Departments", "Add Roles", "View all Roles", "Update Employee Role", "Exit"]
    })
    .then(function (res) {

        switch (res.start) {
          case "Add Employee":
                addEmployees();
            break;
          case "View all Employees":
                viewAllEmployees();
            break;
          case "Remove Employee":
                removeEmployees();
            break;
          case "Add Department":
                addDepartment();
            break;
          case "View all Departments":
                viewAllDepartments();
            break;
          case "Add Roles":
                addRoles();
            break;
          case "View all Roles":
                viewAllRoles();
            break;
          case "Update Employee Role":
                updateEmployees();
            break;
          case "Exit":
                connection.end();
            break;
      
        }
      
    });
}

function viewAllEmployees() {

  connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON manager.id = employee.manager_id;",
      function(err, res) {
          if (err) throw err;

          console.table(res);
          start();
      });
}