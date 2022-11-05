INSERT INTO all_departments (id, department_name)
VALUES (1, "Sales"),
       (2, "Engineering"),
       (3, "Finance"),
       (4, "Sales");

SELECT * FROM all_departments;

INSERT INTO all_roles (id, job_title, department_id, salary)
VALUES (1, "Sales Lead", "Sales", 100000),
       (2, "Salesperson", "Sales", 80000),
       (3, "Lead Engineer", "Engineering", 150000),
       (4, "Software Engineer","Engineering", 120000),
       (5, "Account Manager", "Finance", 160000),
       (6, "Accountant", "Finance", 125000),
       (7, "Legal Team Lead", "Legal", 250000),
       (8, "Lawyer", "Legal", 190000);

SELECT * FROM all_roles;

INSERT INTO all_employees (id, first_name, last_name)



