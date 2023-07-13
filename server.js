const inquirer = require('inquirer');
const mysql = reqiure('mysql2');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3001,
    user: 'root',
    password: '',
    database: 'company_db',
});

connection.connect(err => {
    if (err) throw err;
    console.log("Welcome to the Employee Tracker")
    startMenu();
});

const startMenu = () => {
    inquirer
    .prompt({
        type: 'list',
        message: 'What would you like to do?',
        name: 'start',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Delete a department',
            'Delete a role',
            'Delete an employee',
            'Exit',
        ],
      })
    .then((response) => {
        if (response.start === 'View all departments') {
            viewAllDepartments();
        } else if (response.start === 'View all roles') {
            viewAllRoles();
        } else if (response.start === 'View all employees') {
            viewAllEmployees();
        } else if (response.start === 'Add a department') {
            addDepartment();
        } else if (response.start === 'Add a role') {
            addRole();
        } else if (response.start === 'Add an employee') {
            addEmployee();
        } else if (response.start === 'Update an employee role') {
            updateEmployee();
        } else if (response.start === 'Delete a department') {
            deleteDepartment();
        } else if (response.start === 'Delete a role') {
            deleteRole();
        } else if (response.start === 'Delete an employee') {
            deleteEmployee();
        } else {
            connection.end();
        }
    });
};

