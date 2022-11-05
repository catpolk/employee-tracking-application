INSERT INTO departments (id, department_name)
VALUES (1, "Sales"),
       (2, "Engineering"),
       (3, "Finance"),
       (4, "Sales");

SELECT * FROM departments;

INSERT INTO roles (id, job_title, department_id, salary)
VALUES (1, "Sales Lead", 1, 100000),
       (2, "Salesperson", 1, 80000),
       (3, "Lead Engineer", 2, 150000),
       (4, "Software Engineer",2, 120000),
       (5, "Account Manager", 3, 160000),
       (6, "Accountant", 3, 125000),
       (7, "Legal Team Lead", 4, 250000),
       (8, "Lawyer", 4, 190000);

SELECT * FROM roles;

INSERT INTO employees (id, first_name, last_name, manager_id, role_id)
VALUES (1, "John", "Doe", NULL, 1),
       (2, "Mike", "Chan", 1, 2),
       (3, "Ashley", "Rodriguez", NULL, 3),
       (4, "Kevin", "Tupik", 3, 4),
       (5, "Kunal", "Singh", NULL, 5),
       (6, "Malia", "Brown", 5, 6),
       (7, "Sarah", "Lourd", NULL, 7), 
       (8, "Tom", "Allen", 7, 8);

SELECT * FROM employees;


SELECT employees.id, first_name, last_name, job_title AS title FROM employees INNER JOIN roles ON employees.role_id=roles.id;


SELECT 
    employees.id, 
    employees.first_name, 
    employees.last_name, 
    job_title AS title,
    department_name AS department, 
    salary,
    CONCAT(managers.first_name, ' ', managers.last_name) AS manager
FROM employees 
INNER JOIN roles ON employees.role_id=roles.id 
INNER JOIN departments ON departments.id=roles.department_id
LEFT JOIN employees AS managers ON employees.manager_id=managers.id;