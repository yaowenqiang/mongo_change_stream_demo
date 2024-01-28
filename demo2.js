 'use strict';

 const common = require('./common');
 const Consumer = require('./consumer');
 const campaign = new Consumer('campaign');

 (async function() {
    const collection = await common.getCollection('cart');
    try {
        const cursor = await collection.aggregate([{
            $changeStream: {
                "fullDocument": "updateLookup"
            }
        }]);
        while (await cursor.hasNext()) {
            const event = await cursor.next();
            campaign.process(event);
        }

    } catch(err) {
        console.log(err.stack);
    }

 })()
