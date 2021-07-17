const mysql = require("mysql");
require('dotenv').config();
const inquirer = require("inquirer");

const connection = mysql.createConnection({

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
                "View All Roles",
                "View All Departments",
                "Add Employee",
                "Add Department",
                "Add Role",
                "Update Employee's Role",
                "Exit",
            ],
        })
        .then((answer) => {
            //Based on the option the user picks do the following 
            if (answer.options === "View All Employees") {
                viewAllEmployees();
            } else if (answer.options === "View All Roles") {
                viewAllRoles();
            } else if (answer.options === "View All Departments") {
                viewAllDepartments();
            } else if (answer.options === "Add Employee") {
                addEmployee();
            } else if (answer.options === "Add Department") {
                addDepartment();
            } else if (answer.options === "Add Role") {
                addRole();
            } else if (answer.options === "Update Employee's Role") {
                updateEmployeeRole();
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
    const query = "SELECT * FROM employee";

    connection.query(query, (err, res) => {
        if (err)
            throw err;
        {
            console.table(res);

        }
        start();
    })
}

function viewAllRoles() {
    const query = "SELECT * FROM role";
    connection.query(query, (err, res) => {
        if (err)
            throw err;
        {
            console.table(res);
        }
        start();
    })

}

function viewAllDepartments() {
    const query = "SELECT * FROM department";
    connection.query(query, (err, res) => {
        if (err)
            throw err;
        {
            console.table(res);
        }
        start();
    })

}

// function viewbyManager(manager_id) {
//     connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, role.id FROM employee LEFT JOIN role ON role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = ?;", manager_id, (err, res) => {
//         if (err){
//             throw err;
//         }
//        console.table(res);

//        start();
//     })

//        }




function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the employee's first name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is the employee's last name?",
            name: "lastName"
        },
        // {
        //     type: "list",
        //     message: "What is the employees title?",
        //     name: "title",
        //     choices: ["Salesperson", "Engineer", "IT Support", "Lawyer", "Accountant", "Recruiter"]

        // },
        {
            type: "input",
            message: "What is the employee's role id?",
            name: "roleId"
        },
        {
            type: "input",
            message: "What is is the employee's manager id?",
            name: "managerId"
        },


    ]).then(answers => {
        connection.query("INSERT INTO employee SET ?",
            {
                first_name: answers.name,
                last_name: answers.lastName,
                // title: answers.title,
                role_id: answers.roleId,
                manager_id: answers.managerId
            }, (err, res) => {
                if (err)
                    throw err;

            })

        viewAllEmployees();
    });
}

function addDepartment() {
    inquirer.prompt({

        type: "input",
        message: "What is the new department name?",
        name: "departmentName"

    }).then(function (answer) {
        const query = "INSERT INTO department (name) VALUES ( ? )";
        connection.query(query, answer.departmentName, function (err, res) {
            console.log(`You have added ${answer.departmentName} to Departments`)
        })
        viewAllDepartments();
    })
}

function addRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the new role name?",
            name: "roleName"
        },
        {
            type:"input",
            message: "What is the Salary for the new role?",
            name: "roleSalary"
        },
        {
            type: "input",
            message: "What is the Department Id for the new role?",
            name: "depId"
        }
    ]).then(function (answer) {
        const query = "INSERT INTO role (name, salary, department_id) VALUES ( ? )";
        connection.query(query, answer.roleName, answer.roleSalary, answer.depId, function (err, res) {
            console.log(`You have added ${answer.roleName, answer.roleSalary, answer.depId}`);
        })
        viewAllRoles();
    })
}



// updateEmployeesRole();


// updateEmployeesManager();

//Connection and start of app


connection.connect((err) => {
    if (err) throw err;
    console.log(`connect as id ${connection.threadId}`)
});

start();


