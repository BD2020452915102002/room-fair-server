const {MongoClient, ServerApiVersion} = require('mongodb');

const connect = (dbSettings, mediator) => {
    if (!mediator) throw new Error('Missing Mediator Database');
    if (!dbSettings) throw new Error('Missing DB Config');
    if (!dbSettings.dbUser || !dbSettings.dbName || !dbSettings.dbPassword) throw new Error('Missing DB User or DB Name or DB Password');
    const uri = `mongodb+srv://${dbSettings.dbUser}:${dbSettings.dbPassword}@duc.hbyzp.mongodb.net/?retryWrites=true&w=majority&appName=DUC`;

    MongoClient.connect(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    })
        .then((client) => {
            const db = client.db(dbSettings.dbName);
            mediator.emit('DB connected', {db, client});
        })
        .catch((err) => {
            mediator.emit('DB connection error', err);
        });
};

module.exports = { connect };


