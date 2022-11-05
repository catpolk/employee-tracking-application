-- Create new databases --
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

-- Use employee_db; --
USE employee_db;

-- See database in use --
SELECT DATABASE();

-- Creates the table "produce" within inventory_db --
CREATE TABLE all_departments (
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows --
  id INT NOT NULL PRIMARY KEY,
  -- Makes a string column called "name" which cannot contain null --
  department_name VARCHAR(100) NOT NULL
);

-- Add all roles table --
CREATE TABLE all_roles (
    id INT PRIMARY KEY,
    job_title VARCHAR(100) NOT NULL, 
    department_id INT,
    FOREIGN KEY(department_id) REFERENCES all_departments(id),
    salary decimal(8,2) DEFAULT NULL
);

-- Add all employees table --
CREATE TABLE all_employees (
    id INT PRIMARY KEY,
    FOREIGN KEY(role_id) REFERENCES all_roles(id),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    manager_id INT,
    FOREIGN KEY(manager_id) REFERENCES all_employee(id)
);

