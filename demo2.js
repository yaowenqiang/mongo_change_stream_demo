 'use strict';

 const common = require('./common');
 const Consumer = require('./consumer');
 const campaign = new Consumer('campaign');
 const CartStatus = require('./cart_status')

 const warehouse = new Consumer('warehouse');
 const loyalty = new Consumer('loyalty');


 (async function() {
    const collection = await common.getCollection('cart');
    try {
        const cursor = await collection.aggregate([{
            $changeStream: {
                "fullDocument": "updateLookup"
            }
        }, {
            $match: {
                'fullDocument.customer': {
                    $exists: true
                },
                operationType: 'update',
                // 'updateDescription.updatedFields.customer': {$exists: true}
                'updateDescription.updatedFields.status': {$in: [CartStatus.SHIP, CartStatus.COMPLETE]}

            }
        },{
            $project: {'fullDocument.note':0}
        }]);
        while (await cursor.hasNext()) {
            const event = await cursor.next();
            if (event.fullDocument.status == CartStatus.SHOP) {
                warehouse.process(event);
            }

            if (event.fullDocument.status == CartStatus.COMPLETE) {
                loyalty.process(event);
            }
            // campaign.process(event);
        }

    } catch(err) {
        console.log(err.stack);
    }

 })()
