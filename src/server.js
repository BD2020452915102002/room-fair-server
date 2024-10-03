const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const {connectDb} = require("./database");
const {apis} = require("./apis");
const port = process.env.PORT || 5000

const app = express()

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(helmet())
app.use((err, req, res, next) => {
    reject(new Error('Something went wrong!, err:' + err))
    res.status(500).send('Something went wrong!')
    next()
})

connectDb()
    .then(() => {
        apis(app);
        app.listen(port, () => {
            console.log('Listening on port ' + port);
        });
    })
    .catch((err) => {
        console.error('Database connection failed', err);
    });

