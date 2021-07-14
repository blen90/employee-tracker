DROP DATABASE IF EXISTS employeesDB;

CREATE DATABASE employeesDB;

USE employeesDB;

CREATE TABLE department (
  id INTEGER(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

INSERT INTO department(name)
    VALUES 
    ("Sales"),
    ("Engineering"),
    ("IT"),
    ("Legal"),
    ("Administration"),
    ("Accounting"),
    ("HR");


CREATE TABLE role (
    id INTEGER(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL NOT NULL,
    department_id INTEGER(11)
);

INSERT INTO role(title, salary, department_id)
    VALUES 
    ("Sales Manager", 175000, 1),
    ("Sales Engineer", 125000, 2),
    ("IT Team Lead", 95000, 3),
    ("Paralegal", 80000, 4),
    ("Personal Assistant", 75000, 5),
    ("Accounting Manager", 178000, 6),
    ("Recruiter", 100000, 7);

CREATE TABLE employee (
    id INTEGER(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    role_id INTEGER(10) NOT NULL,
    manager_id INTEGER(10) NOT NULL

);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
    VALUES 
    ("Blenda", "Orellana", 1, 1),
    ("Oso", "Orellana", 2, 2),
    ("Wolfgang", "Orellana", 3, 3),
    ("Balam", "Orellana", 4, 4),
    ("Nena", "Orellana", 5, 5),
    ("Maya", "Orellana", 6, 6),
    ("Cosmo", "Orellana", 7, 7);





