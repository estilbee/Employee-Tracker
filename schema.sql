DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;

USE employee_tracker;


-- view all departments: table with department names and IDs 
    -- add departments: enter name of department and its added to database
-- view all roles: table with job title, role ID, department, salary
    -- add roles: enter title, salary, and department and its added to database
-- view all employees: employee ID, first name, last name, job title, department, salary, manager
    -- add employees: enter first name, last name, job title, department, salary, manager and its added to database
    -- update employee: choose from list of employees, then update information, then new info is updated in database


CREATE TABLE department (
    id INT auto_increment NOT NULL,
    name VARCHAR(30) NOT NULL, 
    PRIMARY KEY (id)
);


CREATE TABLE role (
    id INT auto_increment NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL, 
    PRIMARY KEY (id)
);


CREATE TABLE employee (
    id INT auto_increment NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    salary DECIMAL NOT NULL,
    manager_id INT, 

    PRIMARY KEY (id)
);