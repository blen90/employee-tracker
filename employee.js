const mysql = require("mysql");
require('dotenv').config();
const inquirer = require("inquirer");
const { restoreDefaultPrompts } = require("inquirer");

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
            } else if (answer.options === "Exit") {
                connection.end();
            }
        });
};



function viewAllEmployees() {
    const query = "SELECT employee.id, employee.first_name, employee.last_name, role_id, department_id, role.title, role.salary, role.id, department.name FROM employee LEFT JOIN role ON role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id";
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

    }).then(answer => {
        connection.query("INSERT INTO department SET ?", 
            {
                name: answer.departmentName

            }, (err, res) => {
                if (err)
                    throw err;

            })

        viewAllDepartments();
    });
}


function addRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the new role name?",
            name: "roleName"
        },
        {
            type: "input",
            message: "What is the Salary for the new role?",
            name: "roleSalary"
        },
        {
            type: "input",
            message: "What is the Department Id for the new role?",
            name: "depId"
        }
    ]).then(answers => {
        connection.query("INSERT INTO role SET ?",
            {
                title: answers.roleName,
                salary: answers.roleSalary,
                department_id: answers.depId

            }, (err, res) => {
                if (err)
                    throw err;

            })

        viewAllRoles();
    });
}

function updateEmployeeRole() {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err)
            throw err;

        inquirer.prompt([
            {
                type: "list",
                message: "Which employee's role would you like to change?",
                name: "empName",
                choices: function () {
                    employeeList = [];
                    res.forEach(res => {
                        employeeList.push(
                            res.first_name
                        );
                    })
                    return employeeList;
                }
            }

        ]).then(function (answer) {
            const employeeName = answer;
            console.log(employeeName);

            connection.query("SELECT * FROM role", function (err, res) {
                if (err)
                    throw err;

                inquirer.prompt([
                    {
                        type: "list",
                        message: "What is the employee's new role?",
                        name: "title",
                        choices: function () {
                            roleList = [];
                            res.forEach(res => {
                                roleList.push(
                                    res.title
                                );
                            })
                            return roleList;
                        }
                    }
                ]).then(function (roleAnswer) {
                    const updatedRole = roleAnswer;
                    console.log(updatedRole);



                })
            })
               
        })

        start();
    })
}

//CONNECTION

connection.connect((err) => {
    if (err) throw err;
    console.log(`connect as id ${connection.threadId}`)
});

//START FUNCTION

start();


// function updateEmployeeRole() {
//     connection.query("SELECT * FROM employee", function (err, res) {
//         if (err)
//             throw err;

//         inquirer.prompt([
//             {
//                 type: "list",
//                 message: "Which employee's role would you like to change?",
//                 name: "empName",
//                 choices: function () {
//                     employeeList = [];
//                     res.forEach(res => {
//                         employeeList.push(
//                             res.first_name
//                         );
//                     })
//                     return employeeList;
//                 }
//             }

//         ]).then(function (answer) {
//             const employeeName = answer;
//             console.log(employeeName);

//             connection.query("SELECT * FROM role", function (err, res) {
//                 if (err)
//                     throw err;

//                 inquirer.prompt([
//                     {
//                         type: "list",
//                         message: "What is the employee's new role?",
//                         name: "title",
//                         choices: function () {
//                             roleList = [];
//                             res.forEach(res => {
//                                 roleList.push(
//                                     res.title
//                                 );
//                             })
//                             return roleList;
//                         }
//                     }
//                 ]).then(answer => {
//                     connection.query("INSERT INTO role SET ?",
//                         {
//                             title: answer.title,

//                         }, (err, res) => {
//                             if (err)
//                                 throw err;

//                         })

//                     // connection.query("SELECT * FROM role", function (err, res) {
//     if (err)
//         throw err;

//     inquirer.prompt([
//         {
//             type: "input",
//             message: "What is the employee's new salary?",
//             name: "salary"
//         }
//     ]).then(answer => {
//         connection.query("INSERT INTO role.salary SET ?",
//             {
//                 salary: answer.salary,

//             }, (err, res) => {
//                 if (err)
//                     throw err;
//             })

//     });
//                     })
//                 })

//             })
//         })
//     })
// }






