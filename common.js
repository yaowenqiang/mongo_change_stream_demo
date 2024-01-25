'use strict';

const {MongoClient } = require('mongodb');

class Common {
    static async connect() {
        return await MongoClient.connect('mongodb://localhost:30001/?replicaSet=r1');
    }

    static async getCollection(collectionName) {
        const client = await Common.connect();

        return client.db('test').collection(collectionName);
    }

    static prettyDoc(doc) {
        const result = JSON.stringify(doc, null, 2);
        console.log(result);
        return result;
    }
}

module.exports = Common;
