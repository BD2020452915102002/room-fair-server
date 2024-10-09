module.exports = function (mongoClient) {
    const addUser = async (user) => {
        try {
            const userExists = await checkUserExists(user);
            if (!userExists) {
                const result = await mongoClient.collection('users').insertOne(user);
                console.log(`New user created with the following id: ${result.insertedId}`);
            } else {
                throw new Error("User already exists!")
            }
        } catch (err) {
            console.error("Error adding user:", err.message)
            throw err
        }
    };
    const checkUserExists = async (user) => {
        try {
            const result = await mongoClient.collection('users').findOne({phone: user.phone});
            return !!result;
        } catch (err) {
            console.error('DB connection error:', err)
            return false;
        }
    };
    const getUserByPhone = async (phone) => {
        try {
            return await mongoClient.collection('users').findOne({phone: phone});
        } catch (err) {
            throw err
        }
    };

    return {addUser, checkUserExists, getUserByPhone};
};
