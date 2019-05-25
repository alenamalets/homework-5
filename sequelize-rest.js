const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const Sequelize = require('sequelize')

const port = 3000
const sequelize = new Sequelize('postgres://postgres:secret@localhost:5432/postgres', { define: { timestamps: false } })

const Movie = sequelize.define('movie', {
    title: Sequelize.TEXT,
    yearOfRelease: Sequelize.INTEGER,
    synopsis: Sequelize.TEXT
}, {
        tableName: 'movie'
    })

Movie.sync()

app.use(bodyParser.json())

app.post('/movie', (req, res, next) => {
    Movie
        .create(req.body)
        .then(movie => {
            if (!movie) {
                return res.status(404).send({
                    message: `Movie does not exist`
                })
            }
            return res.status(201).send(movie)
        })
        .catch(error => next(error))
})

app.get('/movie/:id', (req, res, next) => {
    Movie
      .findByPk(req.params.id)
      .then(movie => {
        if (!movie) {
          return res.status(404).send({
            message: `Movie does not exist`
          })
        }
        return res.send(movie)
      })
      .catch(error => next(error))
})

app.put('/movie/:id', (req, res, next) => {
    Movie
      .findByPk(req.params.id)
      .then(movie => {
        if (!movie) {
          return res.status(404).send({
            message: `Movie does not exist`
          })
        }
        return movie.update(req.body).then(movie => res.send(movie))
      })
      .catch(error => next(error))
})

app.listen(port, () => `Listening on port ${port}`)