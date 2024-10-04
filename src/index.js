const {initDI} = require('./di')
const {start} = require("./sever");
const {serverSettings, dbSettings} = require("./config");
const {connectRepo} = require("./repo");
const {connectDb} = require("./database");
const EventEmitter = require('events').EventEmitter
const mediator = new EventEmitter()

console.log('-- Room fair server --')
console.log('Connecting to db...')

process.on('uncaughtException', err => {
    console.error('Unhandled Exception', err)
})

connectDb(dbSettings, mediator)

mediator.on('DB connection error', err => {
    console.error('DB connect error', err)
})
mediator.on('DB connected', (db) => {
    console.log('Connected db')
    initDI(mediator)
})
mediator.once('di.ready', container => {
    container.registerValue('mediator', mediator)
    container.registerValue('serverSettings', serverSettings)
    container.registerValue('repo', connectRepo(dbSettings))
    start(container).then(app => {
        console.log('Server started at port ', app.address().port)
    })
})
