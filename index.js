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
//   db.query('SELECT * FROM students', function (err, results) {
//     console.log(results);
//   });
  
function menu() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'select',
            choices: [
                {
                    name: 'View All Employees',
                    value: 'viewEmployees'
                },
                {
                    name: 'Add employee',
                    value: 'addAmployee'
                },
                {
                    name: 'Update Employee Role',
                    value: 'updateEmployeeRole'
                },
                {
                    name: 'View All Roles',
                    value: 'viewAllRoles'
                },
                {
                    name: 'Add Role',
                    value: 'addRole'
                },
                {
                    name: 'View All Departments',
                    value: 'Add Department'
                }
            ],
          },
    ]).then(response => {
        console.log(response);
    })

}

menu();

//user selects view employee, then call a function that would make a quory to mysql to the right table. 



