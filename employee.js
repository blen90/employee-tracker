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
    const query = 
    "SELECT * FROM employee";
    // "LEFT JOIN role ON role.id" +
    // "LEFT JOIN department ON department.id = role.department_id";

    connection.query(query, (err, res) => {
        if(err)
        throw err;
    {
        console.table(res);
    
    }
    start();
    })
}
// function viewAllEmployees() {
//     const query = connection.query(
//         'SELECT * FROM employee', 
//         (err, res) => {
//             if (err) 
//             throw err;

//          res.forEach(employee => {
//             console.table(`ID: ${employee.id} Name:  ${employee.first_name} Last Name:${employee.last_name} Role Id:  ${employee.role_id} Manager Id: ${employee.manager_id}`);
//          })     

//         start();
//      })
//         }
        
     



function viewByDepartment() {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err){
            throw err;
        }
       console.table(res);

       start();
    })
   
       }

    //    let getManagers = () => {
    //     let query = 'SELECT id,first_name, last_name, manager_id,role_id FROM employee';
    //     query += ' WHERE manager_id IS NULL;';
    //     return new Promise((resolve, reject) => {
    //         connection.query(query, (err, res) => {
    //             if (err) {
    //                 reject(new Error(err.message));
    //             }
    //             let employees = [];
    //             res.forEach(({ id, first_name, last_name, manager_id, roleId }) => {
    //                 let emp = new Employee(id, first_name, last_name, manager_id, roleId);
    //                 employees.push(emp);
    //             });
    //             resolve(employees);
    //         })
    //     });
    // };
    
    
    
    // case 'View All Managers':
    //                     getManagers()
    //                         .then((response) => {
    //                             displayResults(response);
    //                         })
    //                         .then(() => runSearch())
    //                         .catch((err) => console.error('Promise rejected:', err));
    //                     break;


// function viewbyManager(managerId) {
//     connection.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, role.id FROM employee LEFT JOIN role ON role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = ?;', managerId, (err, res) => {
//         if (err){
//             throw err;
//         }
//        console.table(res);
       
//        start();
//     })
   
//        }




function addEmployee() {
    inquirer.prompt ([
        {
            type:"input",
            message:"What is the employee's first name?",
            name:"name"
        },
        {
            type:"input",
            message:"What is the employee's last name?",
            name:"lastName"
        },
        {
            type:"input",
            message:"What is the employee's role id?",
            name:"roleId"
        },
        {
            type:"input",
            message:"What is is the employee's manager id?",
            name:"managerId"
        }


    ]).then(answers => {
        connection.query("INSERT INTO employee SET ?", 
        {
            first_name: answers.name,
            last_name: answers.lastName,
            role_id: answers.roleId,
            manager_id: answers.managerId
        }, (err, res) => {
            if (err)
            throw err;
        
        })

        start();
    });
}


// removeEmployee();


// updateEmployeesRole();


// updateEmployeesManager();

//Connection and start of app


connection.connect((err) => {
    if (err) throw err;
    console.log(`connect as id ${connection.threadId}`)
});

start();


