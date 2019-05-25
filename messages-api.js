const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const port = 3000
let cnt = 0

app.use(bodyParser.json())

app.post('/messages', (req, res) => {
    if (cnt >= 5) {
        return res.status(500).send()
    }
    if (!req.body.text) {
        return res.status(400).send()
    }
    else {
        cnt++
        console.log(req.body.text)
        return res.json(req.body.text)
    }
})

app.listen(port, () => console.log(`Listening on port ${port}!`))