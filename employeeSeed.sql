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
    ("Salesperson", 125000, 1),
    ("Engineer Manager", 175000, 2),
    ("Engineer", 115000, 2),
    ("IT Manager", 175000, 3),
    ("IT Support", 80000, 3),
    ("Legal Manager", 175000, 4),
    ("Lawyer", 75000, 4),
    ("Accounting Manager", 175000, 5),
    ("Accountant", 110000, 5),
    ("HR Manager", 175000,6),
    ("Recruiter", 100000, 6);

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
    ("Juno", "Orellana", 3, 3),
    ("Balam", "Orellana", 4, 4),
    ("Coco", "Orellana", 4, 4),
    ("Nena", "Orellana", 5, 5),
    ("Lobo", "Orellana", 5, 5),
    ("Maya", "Orellana", 6, 6),
    ("Dogma", "Orellana", 7, 7);
