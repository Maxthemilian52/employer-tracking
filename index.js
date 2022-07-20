const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');

const app = express();

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Baxter52!',
        database: 'tracker_db'
    },
    console.log('connected to tracker_db')
  );

inquirer
const begin = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: "Hello! Please choose what you'd like to do!",
            choices: ['View All Employees', 'View All Roles', 'View All Departments', 'Add Employee', 'Add Role', 'Add Department',  'Update Employee Role']
        }
    ])
}

const menu = () => {
    begin().then((data) => {
        switch(data.choice){
        case 'View All Employees':
            viewAllEmployees();
            break;
        case 'View All Roles':
            viewAllRoles();
            break;
        case 'View All Departments':
            viewAllDepartments();
            break;
        case 'Add Employee':
            addEmployee();
            break;
        case 'Add Role':
            addRole();
            break;
        case 'Add Department':
            addDepartment();
            break;
        }
    })
}

const viewAllEmployees = () => {
    const sql = `SELECT * FROM employee`;
    db.query(sql, (err, res) => {
      if (err) {
        console.log(err)
        return "Error";
      }
      console.table(res);
      menu();
    })
  }
  const viewAllRoles = () => {
    const sql = `SELECT * FROM roles`;
    db.query(sql, (err, res) => {
      if (err) {
        console.log(err)
        return "Error";
      }
      console.table(res);
      menu();
    })
  }
  const viewAllDepartments = () => {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, res) => {
      if (err) {
        console.log(err)
        return "Error";
      }
      console.table(res);
      menu();
    })
  }

const addEmployee = () => {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'firstName',
        message: 'Please enter first name of Employee.'
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'Please enter last name of Employee.'
      },
      {
        type: 'input',
        name: 'roleId',
        message: 'Please enter role ID of Employee.'
      },
      {
        type: 'input',
        name: 'managerId',
        message: 'Please enter manager ID of Employee'
      }
    ])
    .then((data) => {
      db.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id)
                VALUES('${data.firstName}', '${data.lastName}', ${data.roleId}, ${data.managerId})`);
      
      db.query(`SELECT * FROM employee`, (err, res) => {
        if (err) {
          console.log(err);
          return 'error'
        }
        console.table(res);
      });
    
      menu();
    });
  }
  const addDepartment = () => {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'departmentName',
        message: 'Please enter the name of new department.'
      }
    ])
    .then((data) => {
      db.query(`INSERT INTO department(department_name)
                VALUES('${data.departmentName}')`);
      
      db.query(`SELECT * FROM department`, (err, res) => {
        if (err) {
          console.log(err);
          return 'error'
        }
        console.table(res);
      });
    
      menu();
    });
  }
  const addRole = () => {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'roleName',
        message: 'Please enter name of new Role.'
      },
      {
        type: 'input',
        name: 'roleSalary',
        message: 'Please enter role salary.'
      },
      {
        type: 'input',
        name: 'departmentId',
        message: 'Please enter department ID.'
      }
    ])
    .then((data) => {
      db.query(`INSERT INTO roles(title, salary, department_id)
                VALUES('${data.roleName}', '${data.roleSalary}', '${data.departmentId}')`);
      
      db.query(`SELECT * FROM roles`, (err, res) => {
        if (err) {
          console.log(err);
          return 'error'
        }
        console.table(res);
      });
    
      menu();
    });
  }
  
  
  menu();