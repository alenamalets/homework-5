const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const { Pool } = require('pg')

const port = 3000

const pool = new Pool({ connectionString: process.env.DATABASE_URL || 'postgresql://postgres:secret@localhost:5432/postgres' })

pool.on('error', (err) => {
    console.error('error event on pool', err)
})

pool.query(` 
    CREATE TABLE IF NOT EXISTS "person" 
    (
        id serial, 
        first_name varchar(255), 
        last_name varchar(255), 
        eye_color varchar(255)
    );`)
    .then(() => console.log('Table created successfully'))
    .catch(err => {
        console.error('Unable to create table, shutting down...', err);
        process.exit(1);
    })

app.use(bodyParser.json())

app.post('/person', (req, res, next) => {
    pool.query('INSERT INTO "person" (first_name, last_name, eye_color) VALUES ($1, $2, $3) RETURNING *',
        [req.body.first_name,
        req.body.last_name,
        req.body.eye_color])
        .then(results => res.json(results.rows[0]))
        .catch(err => {
            console.log(err);
            return next(err)}
        )
})

app.put('/person/update', (req, res, next) => {
    pool.query(`UPDATE "person" SET eye_color = 'blue eyes' WHERE eye_color = 'brown eyes' RETURNING *`)
        .then(results => {
            if (results.rowCount === 0) {
                res.status(404).end()
            } else {
                res.json(results.rows)
            }
        })
        .catch(err => {
            console.log(err);
            return next(err)}
        )
})

app.get('/person/select', (req, res, next) => {
    const name = "James";
    pool.query(`SELECT * FROM "person" WHERE first_name = $1`, [name])
        .then(results => {
            if (results.rowCount === 0) {
                res.status(404).end()
            } else {
                res.json(results.rows)
                console.log(results.rows);
                
            }
        })
        .catch(err => {
            console.log(err);
            return next(err)}
        )
})


app.listen(port, () => console.log("listening on port " + port))