const mysql2 = require("mysql2");
const inquirer = require("inquirer");

// const connection = mysql2.createConnection(config);



// const sequelize = new Sequelize({
//     databaseName: process.env.DB_NAME,
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: processenv.DB_PASS, 
    
//         host: 'localhost',
//         dialect: 'mysql',
//         port: 3306
    
// });


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

// viewAllEmployees();



// viewByDepartment();


// viewbyManager();


// addEmployee();


// removeEmployee();


// updateEmployeesRole();


// updateEmployeesManager();

//Connection and start of app



// connection.connect((err) => {
//     if (err) throw err;
//     console.log(`connect as id ${connection.threadId}`)
//     start();

// });

start();
