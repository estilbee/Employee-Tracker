USE employee_tracker

INSERT INTO department ('name')
VALUES
("Engineering")
("Finance")
("Marketing")
("Human Resources");

INSERT INTO 'role' (title, salary, department_id)
VALUES 
(Software Engineer, '150,000', ?? );

INSERT INTO employee (first_name, last_name, 'role', role_id, salary, department_id, manager_id)
VALUES
("Olivia", "Daouphars", "Software Engineer", role_id, "150,000", department_id, manager_id);

