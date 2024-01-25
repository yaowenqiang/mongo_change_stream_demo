 'use strict';

 const common = require('./common');

 (async function() {
    const collection = await common.getCollection('demo');
    try {
        const cursor = await collection.aggregate([{
            $changeStream: {}
        }]);
        while (await cursor.hasNext()) {
            const doc = await cursor.next();
            common.prettyDoc(doc);
        }

    } catch(err) {
        console.log(err.stack);
    }

 })()
