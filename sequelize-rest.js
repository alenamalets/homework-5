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

//_create_ a new movie resource
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

//_read_ a single movie resource
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

//_update_ a single movie resource
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

//_delete_ a single movie resource
app.delete('/movie/:id', (req, res, next) => {
    Movie
      .findByPk(req.params.id)
      .then(movie => {
        if (!movie) {
          return res.status(404).send({
            message: `Movie does not exist`
          })
        }
        return movie.destroy()
          .then(() => res.send({
            message: `Movie was deleted`
          }))
      })
      .catch(error => next(error))
})

//_read_ all movies (the entire collections resource)
app.get('/movie', (req, res, next) => {
    const limit = req.query.limit || 3
    const offset = req.query.offset || 0
    Movie
    .findAll({
        limit, offset
      })
      .then(movies => {
        res.send({ movies })
      })
      .catch(error => next(error))
})


app.listen(port, () => `Listening on port ${port}`)