const mysql = require("mysql");
require('dotenv').config();
const inquirer = require("inquirer");

const connection = mysql.createConnection( {
 
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, 
    
        database: 'employeesDB',
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    }
);

connection.connect((err) => {
    if (err) throw err;
    console.log(`connect as id ${connection.threadId}`)
});


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

//Functions depending on the option the user chose

function viewAllEmployees() {
     connection.query('SELECT * FROM employee', (err, res) => {
         if (err){
             throw err;
         }
        console.table(res);
            
     })
     start();
        }
        
     






// viewByDepartment();


// viewbyManager();


// addEmployee();


// removeEmployee();


// updateEmployeesRole();


// updateEmployeesManager();

//Connection and start of app




start();
