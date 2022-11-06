const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');

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
  
  // Query database

function getDepartmentsQuery(){
  return 'SELECT * FROM departments;';
}

function getEmployeesQuery(){
  return 'SELECT * FROM employees;';
}

function getRolesQuery(){
  return 'SELECT * FROM roles;';
}



  
function menu() {
  return  inquirer.prompt({
      type: 'list',
      message: 'What would you like to do?',
      name: 'mainMenu',
      choices: [
        { name: 'View All Employees', value: 'viewEmployees' },
        { name: 'Add employee', value: 'addAmployee' },
        { name: 'Update Employee Role', value: 'updateEmployeeRole' },
        { name: 'View All Roles', value: 'viewAllRoles' },
        { name: 'Add Role', value: 'addRole' },
        { name: 'View All Departments', value: 'viewAllDepartments' },
        { name: "Add Department", value: "addDepartment" },
        { name: "Quit", value: "quit" }
      ]
    }).then(async response => {
      console.log(response);
      let query;

      switch(response.mainMenu){
        case "viewAllDepartments": 
          query = getDepartmentsQuery();
          break;
        case "viewEmployees":
          query = getEmployeesQuery();
          break;
        case "viewAllRoles":
          query = getRolesQuery();
          break;
        case 'quit':
          db.end();
          return;
      }

      await db.promise().query(query).then(([rows, flds]) => { 
        console.log(rows); 
        // console.log(flds);
      });
      
      return menu();
    })
}

menu();

// getDepartments();

// db.end();
//user selects view employee, then call a function that would make a quory to mysql to the right table. 



