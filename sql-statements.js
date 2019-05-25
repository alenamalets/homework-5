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
    CREATE TABLE IF NOT EXISTS person 
    (
        id serial, 
        first_name varchar(255), 
        last_name varchar(255), 
        eye_color varchar(255)
    );`)
    .then(() => console.log('Tables created successfully'))
    .catch(err => {
        console.error('Unable to create tables, shutting down...', err);
        process.exit(1);
    })
    
app.use(bodyParser.json())

app.post('/users', (req, res, next) => {
        pool.query('INSERT INTO "user" (email) VALUES ($1) RETURNING *', [req.body.email])
            .then(results => res.json(results.rows[0]))
            .catch(next)
})

app.listen(port, () => console.log("listening on port " + port))