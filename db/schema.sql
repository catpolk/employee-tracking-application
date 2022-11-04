CREATE DATABASE employee_db;

-- Create two new databases --
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

-- Use employee_db; --
USE employee_db;

-- See database in use --
SELECT DATABASE();

-- Creates the table "produce" within inventory_db --
CREATE TABLE all_departments (
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows --
  id INT NOT NULL,
  -- Makes a string column called "name" which cannot contain null --
  department_name VARCHAR(100) NOT NULL
);

-- Add all roles table --
CREATE TABLE all_roles (
    job_title VARCHAR(100) NOT NULL, 
    role_id INT NOT NULL,
    department_name VARCHAR(100) NOT NULL, 
    salary decimal(8,2) DEFAULT NULL
);

-- Add all employee table --
CREATE TABLE all_employee (
    role_id INT NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    job_title VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    salary decimal(8,2) DEFAULT NULL,
    manager VARCHAR(100) NOT NULL
);