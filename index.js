const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');
const cTable = require('console.table');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: '',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);
  
  // using db.query to select departments table 
async function getDepartments(callbackFunction){
  return await db.promise().query('SELECT id, department_name AS department FROM departments;').then(callbackFunction); 
}
  // using db.query to select employees table
async function getEmployees(callbackFunction){
  return await db.promise().query("SELECT employees.id, employees.first_name, employees.last_name, job_title AS title, department_name AS department, salary, CONCAT(managers.first_name, ' ' , managers.last_name) AS manager FROM employees INNER JOIN roles ON employees.role_id=roles.id INNER JOIN departments ON departments.id=roles.department_id LEFT JOIN employees AS managers ON employees.manager_id=managers.id;").then(callbackFunction);
}

 // using db.query to select roles table
async function getRoles(callbackFunction){
  return await db.promise().query("\
    SELECT roles.id, roles.job_title, roles.salary, departments.department_name FROM roles \
    JOIN departments ON departments.id=roles.department_id ORDER BY id ASC;").then(callbackFunction);
}

const printTable = ([rows, fields]) => {
  console.table(rows);
}
 
//selects a table and inserts user's input into the table 
async function addDepartment(){
  await inquirer.prompt({
    name: 'departmentName', 
    message: 'What is the name of the department?'
  }).then(async response => {
    db.query(`INSERT INTO departments (department_name) VALUES ('${response.departmentName}')`);
  })
    
  console.log('Added new department');
  return;
}

//function that adds roles 
async function addRole(){
  let choices;

  await db.promise().query('SELECT id AS value, department_name AS name FROM departments;').then(([rows, flds]) => { 
    choices = rows;
  }); 

  await inquirer.prompt([
    { name: 'roleName', message: 'What is the name of the new role?' },
    { type: 'number', name: 'salary', message: 'What is the salary of the new role?' }, 
    {
      type: 'list',
      name: 'department_id',
      message: 'Which department does the role belong to?',
      choices: choices
    }
  ]).then(async response => {
    db.query(`INSERT INTO roles (job_title, salary, department_id) VALUES ('${response.roleName}', '${response.salary}', '${response.department_id}')`);
  })

  console.log('Added new role');
  return;
}
//function that adds an employee
async function addEmployee(){
  let choicesRole;
  let choicesManager;

  await db.promise().query('SELECT id AS value, job_title AS name FROM roles;').then(([rows, flds]) => {
    choicesRole = rows;
  });
  await db.promise().query("SELECT id AS value, CONCAT(first_name, ' ', last_name) AS name FROM employees;").then(([rows, flds]) => {
    choicesManager = rows;
  });

  await inquirer.prompt([ 
    { name: 'first_name', message: "What is the new employee's first name?"},
    { name: 'last_name', message: "What is the employee's last name?"},
    { 
      type: 'list',
      name: 'role_id', 
      message: "What is the employee's role?",
      choices: choicesRole
    },
    {
      type: 'list',
      name: 'manager_id',
      message: "Who is the employee's manager?",
      choices: [{name: 'None', value: null }, ...choicesManager]
    }

  ]).then(async response => {
    //inserts data entered by a user.
    db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${response.first_name}', '${response.last_name}', ${response.role_id}, ${response.manager_id})`);
  })
  //prints if the data is entered into the db 
  console.log('Added a new employee');
  return;
}

  //main menu of the questions that asked in the command line.
function menu() {
  return inquirer.prompt({
      type: 'list',
      message: 'What would you like to do?',
      name: 'mainMenu',
      choices: [
        { name: 'View All Employees', value: 'viewEmployees' },
        { name: 'Add employee', value: 'addEmployee' },
        { name: 'Update Employee Role', value: 'updateEmployeeRole' },
        { name: 'View All Roles', value: 'viewAllRoles' },
        { name: 'Add Role', value: 'addRole' },
        { name: 'View All Departments', value: 'viewAllDepartments' },
        { name: "Add Department", value: "addDepartment" },
        { name: "Quit", value: "quit" }
      ]
    }).then(async response => {
      console.log(response);
      
      //switch statement that takes all the functions to execute the application
      switch(response.mainMenu){
        case "viewAllDepartments": 
          await getDepartments(printTable);
          break;
        case "viewEmployees":
          await getEmployees(printTable);
          break;
        case "viewAllRoles":
          await getRoles(printTable);
          break;
        case "addDepartment":
          await addDepartment();
          break;
        case 'addRole':
          await addRole();
          break;
        case 'addEmployee':
          await addEmployee();
          break;
        case 'quit':
          db.end();
          return;
      }
      
      return menu();
    })
}

menu();




