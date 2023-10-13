const { MongoClient } = require('mongodb');

const config = require('../config.json');

const mongo = () => {

    const mongoURL = `mongodb+srv://${config.username}:${config.password}@cluster0.l8elxkh.mongodb.net/${config.database_name}?retryWrites=true&w=majority`;
    let db = null;

    async function connect() {
        try {
            const client = new MongoClient(mongoURL);
            await client.connect();

            db = client.db();

            console.log('Connected to Mongo DB');
        } catch (error) {
            console.log(error);
        }
    }

    async function save(collectionName, data) {
        try {
            const collection = db.collection(collectionName);
            await collection.insertOne({...data});
        } catch (error) {
            console.log(error);
        }
    }

    async function find(collectionName, coin_name) {
        try {
            const collection = db.collection(collectionName);

            if (coin_name == '')    {
                return await collection.find({}).toArray();
            } else {
                return await collection.find({ searchTerm: coin_name }).toArray();
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function update(collectionName, coin_name, data) {
        try {
            const collection = db.collection(collectionName);

            await collection.updateOne(
                { searchTerm: coin_name },
                {   $set: {...data},
                    $inc: {searchNum: 1}}
            );
        } catch (error) {
            console.log(error);
        }
    }

    return {
        connect,
        save,
        find,
        update
    };
};

module.exports = mongo();
