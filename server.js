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
        name: 'menu',
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
        if (response.menu === 'View all departments') {
            viewAllDepartments();
        } else if (response.menu === 'View all roles') {
            viewAllRoles();
        } else if (response.menu === 'View all employees') {
            viewAllEmployees();
        } else if (response.menu === 'Add a department') {
            addDepartment();
        } else if (response.menu === 'Add a role') {
            addRole();
        } else if (response.menu === 'Add an employee') {
            addEmployee();
        } else if (response.menu === 'Update an employee role') {
            updateEmployee();
        } else if (response.menu === 'Delete a department') {
            deleteDepartment();
        } else if (response.menu === 'Delete a role') {
            deleteRole();
        } else if (response.menu === 'Delete an employee') {
            deleteEmployee();
        } else {
            connection.end();
        }
    });
};

const viewAllDepartments = () => {
    connection.query('SELECT * FROM department', function (err,res) {
        if (err) throw err;
        console.table(res);
        startMenu();
    });
};

const viewAllRoles = () => {
    connection.query('SELECT r.id, r.title, d.name AS department, r.salary FROM roles r JOIN department d ON r.department_id = d.id',
    (err, res) => {
        if (err) throw err;
        console.table(res);
        startMenu();
    });
};


const viewAllEmployees = () => {
    connection.query(`SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, 
    r.salary 
    CONCAT(m.first_name, ' ', m.last_name) AS manger 
    FROM employee e 
    JOIN role r ON e.role_id = r.id 
    JOIN department d ON r.department_id = d.id
    LEFT JOIN employee m ON e.manager_id = m.id`,
    (err, res) => {
        if (err) throw err;
        console.table(res);
        startMenu();
    });
};

const addDepartment = () => {
    inquirer
    .prompt([
        {
        type: 'input',
        message: 'Please enter name for the Department',
        name: 'department',
        }
    ])
    .then(answer => {
        connection.query(
            'INSERT INTO department (name) VALUES (?)',
            [answer.department],
            (err, res) => {
                if (err) throw err;
                console.log("You have succesfully added new Department");
                startMenu();
            }
        );
    });
};

const addRole = () => {
    connection.query('SELECT id, name FROM department', (err, res) => {
        if (err) throw err;

        const departmentNames = res.reduce((acc, curr) => {
            acc[curr.name] = curr.id;
            return acc;
        }, {});

    inquirer.prompt([
        {
            name: 'role',
            type: 'input',
            message: 'Please enter your role within the company'
        },
        {
            name: 'salary',
            type: 'input',
            message: 'Please enter your salary'
        },
        {
            name: 'department',
            type: 'list',
            message: 'Please select department for your role',
            choices: Object.keys(departmentNames),
        }
    ])
    .then(answer => {
        const departmentID = departmentNames[answer.department];
        connection.query(
            'INSERt INTO role (title, salary,department_id) VALUES (?, ?, ?)',
            [answer.role, answer.salary, answer.departmentID],
            function (err, res) {
                if (err) throw err;
                console.log('You have successfully addednew role');
                startMenu();
            }
        );
    });
    });
};

const addEmployee = () => {
    connection.query('SELECT id, title FROM role', (err, res) => {
        if (err) throw err;

        const roleNames = res.reduce((acc, curr) => {
            acc[curr.title] = curr.id;
            return acc;
        }, {});

    connection.query('SELECT id, first_name, last_name, manager_id FROM employee', (err, res) => {
        if (err) throw err;

        const managers = [];

        res.forEach((employee) => {
            const managerName = `${employee.first_name} ${employee.last_name}`;
            managers[managerName] = employee.id;
        });

    inquirer.prompt ([
        {
            name:'firstName',
            type: 'input',
            message: 'Please enter your first name'
        },
        {
            name:'lastName',
            type: 'input',
            message: 'Please enter your last name'
        },
        {
            name:'role',
            type: 'list',
            message: 'Please select your role within th ecompany',
            choices: Object.keys(roleNames),
        },
        {
            name:'manager',
            type: 'list',
            message: 'Please select your manager',
            choices: Object.keys(managers),
        }
    ])
        .then(answer => {
            const roleID = roleNames[answer.roles];
            const managerID = managers[answer.managers];
            connection.query('INSERt INTO employee SET ?',
            {
                first_name: answer.firstName,
                last_name: answer.lastName,
                role_id: roleID,
                manager_id: managerID
            },
            function (err, res) {
                if (err) throw err;
                console.log("Employee was successfully added");
                startMenu();
            });
        });
    });
 });
};


