module.exports =(db) =>{
    const userRepo = (mongoClient) => {
        return require('./user.repo')(mongoClient)
    }
    const connectUserRepo = () => {
        if (!db) throw new Error('Connect DB failed')
        return userRepo(db)
    }
    return { connectUserRepo: connectUserRepo() }
}
