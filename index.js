const mysql = require('mysql')
const express = require('express')

var app = express()

const bodyparser = require('body-parser')
const res = require('express/lib/response')

//app.use(bodyparser.json())

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: '',
    password: '',
    database: ''
})

mysqlConnection.connect((err) => {
    if(!err) {
        console.log('Connected')
    } else {
        console.log('Not connected. \n Error: '+ JSON.stringify(err,undefined,2))
    }
})

app.listen(3000, () => console.log('Express Server is running at port number 3000.'))


//Get all employees
app.get('/employees', (require, response) => {
    mysqlConnection.query('SELECT * FROM employee', (err, rows, fields) => {
        if(!err) {
            response.send(rows)
        }else {
            console.log(err)
        }
    })
})

//Get an employee
app.get('/employees/:id', (request, response) => {
    mysqlConnection.query('SELECT * FROM employee WHERE id_employee = ?',[request.params.id], (err, rows, fields) => {
        if(!err) {
            response.send(rows)
        }else {
            console.log(err)
        }
    })
})

//Delete an employee
app.delete('/employees/:id', (request, response) => {
    mysqlConnection.query('DELETE FROM employee WHERE id_employee = ?',[request.params.id], (err, rows, fields) => {
        if(!err) {
            response.send('Employee Deleted.')
        }else {
            console.log(err)
        }
    })
})

