const mysql = require("mysql");
const inquirer = require("inquirer");
const connection = require("./config/connection");


const connection = mysql.createConnection(config);


const start = () => {
    inquirer
      .prompt({
        name: "options",
        type: "list",
        message: "How would you like to proceed?",
        choices: [
            "View All Employees",
            "View All Employees by Department",
            "View All Employees by Manager",
            "Add Employee",
            "Remove Employee",
            "Update Employee's Role",
            "Update Employee's Manager",
            "Exit",
        ],
      })
      .then((answer) => {
      //Based on the option the user picks do the following 
        if (answer.options === "View All Employees") {
          viewAllEmployees();
        } else if (answer.options === "View All Employees by Department") {
          viewByDepartment();
        } else if (answer.options === "View All Employees by Manager") {
            viewbyManager();
        } else if (answer.options === "Add Employee") {
            addEmployee();
        } else if (answer.options === "Remove Employee") {
            removeEmployee();
        } else if (answer.options === "Update Employee's Role") {
            updateEmployeesRole();
        } else if(answer.options === "Update Employee's Manager") {
            updateEmployeesManager();
        } else {
          connection.end();
        }
      });
  };
//JOIN TABLES

//SCHEMA
//EMPLOYEE
//ROLE AND MANAGER ID ARE FOREIGN KEYS IN EMPLOYEE

//ROLE
//after you get an insert google how to get the id from mysql


connection.connect((err) => {
    if (err) throw err;
    console.log(`connect as id ${connection.threadId}`)
    start();

});
