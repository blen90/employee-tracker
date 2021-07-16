DROP DATABASE IF EXISTS employeesDB;

CREATE DATABASE employeesDB;

USE employeesDB;

CREATE TABLE department (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

INSERT INTO department(name)
    VALUES 
    ("Sales"),
    ("Engineering"),
    ("IT"),
    ("Legal"),
    ("Accounting"),
    ("HR");


CREATE TABLE role (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL NOT NULL,
    department_id INTEGER,

    FOREIGN KEY (department_id) REFERENCES department(id)
);

INSERT INTO role(title, salary, department_id)
    VALUES 
    ("Sales Manager", 175000, 1),
    ("Engineer Manager", 175000, 2),
    ("IT Manager", 175000, 3),
    ("Legal Manager", 175000, 4),
    ("Accounting Manager", 175000, 5),
    ("HR Manager", 175000,6);


CREATE TABLE employee (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    role_id INTEGER(10) NOT NULL,
    manager_id INTEGER(10) NOT NULL,

    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
    VALUES 
    ("Blenda", "Orellana", 1, 1), 
    ("Oso", "Orellana", 2, 2),
    ("Wolfgang", "Orellana", 3, 3),
    ("Balam", "Orellana", 4, 4),
    ("Nena", "Orellana", 5, 5),
    ("Maya", "Orellana", 6, 6);
 





-- use employees;
-- INSERT INTO department
--     (name)
-- VALUES
--     ('Sales'),
--     ('Engineering'),
--     ('Finance'),
--     ('Legal');
-- INSERT INTO role
--     (title, salary, department_id)
-- VALUES
--     ('Sales Lead', 100000, 1),
--     ('Salesperson', 80000, 1),
--     ('Lead Engineer', 150000, 2),
--     ('Software Engineer', 120000, 2),
--     ('Account Manager', 160000, 3),
--     ('Accountant', 125000, 3),
--     ('Legal Team Lead', 250000, 4),
--     ('Lawyer', 190000, 4);
-- INSERT INTO employee
--     (first_name, last_name, role_id, manager_id)
-- VALUES
--     ('John', 'Doe', 1, NULL),
--     ('Mike', 'Chan', 2, 1),
--     ('Ashley', 'Rodriguez', 3, NULL),
--     ('Kevin', 'Tupik', 4, 3),
--     ('Kunal', 'Singh', 5, NULL),
--     ('Malia', 'Brown', 6, 5),
--     ('Sarah', 'Lourd', 7, NULL),
--     ('Tom', 'Allen', 8, 7);