const { MongoClient, ServerApiVersion } = require('mongodb');

const dbUser = process.env.MONGODB_USER || '';
const dbPassword = process.env.MONGODB_PASSWORD || '';
const uri = `mongodb+srv://${dbUser}:${dbPassword}@duc.hbyzp.mongodb.net/?retryWrites=true&w=majority&appName=DUC`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function runMongoDb() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    catch (err) {
       throw err
    }
}
process.on('SIGINT', async () => {
    await client.close();
    console.log('MongoDB connection closed');
    process.exit(0);
})

module.exports = {runMongoDb};
