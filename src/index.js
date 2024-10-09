const {initDI} = require('./di')
const {start} = require("./sever");
const {serverSettings, dbSettings,serverHelper,httpCode} = require("./config");
const repo = require("./repo");
const {connectDb} = require("./database");
const {userValidator} = require("./models");
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

mediator.on('DB connected', ({ db, client }) => {
    process.on('exit', async () => {
        await client.close();
        console.log('MongoDB connection has been closed.');
    });

    ['SIGINT', 'SIGTERM'].forEach(signal => {
        process.on(signal, async () => {
            console.log(`Received signal ${signal}, closing MongoDB connection...`);
            await client.close();
            console.log('MongoDB connection was closed due to receiving signal.');
            process.exit(0);
        });
    });
    console.log('Connected db')
    initDI(mediator,{
        repo: repo(db)
    })

})
mediator.once('di.ready', container => {
    container.registerValue('mediator', mediator)
    container.registerValue('serverSettings', serverSettings)
    container.registerValue('serverHelper', serverHelper)
    container.registerValue('model', userValidator)
    container.registerValue('httpCode', httpCode)
    start(container).then(app => {
        console.log('Server started at port ', app.address().port)
    }).catch(err => {
        console.error('Error starting server:', err);
    })
})
