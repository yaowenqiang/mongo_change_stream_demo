'use strict';
const common = require('./common');
const Consumer = require('./consumer');
const CartStatus = require('./cart_status');
const cart_status = require('./cart_status');

const analysics = new Consumer('analysics', false);

(async function() {
    try {
        const collection = await common.getCollection('cart');
        const options = {fullDocument: 'updateLookup'};
        const pipeline = [{$match: {'fullDocument.status': CartStatus.SHIP}}]
        const changeStream = collection.watch(pipeline, options);
        changeStream.on('change', event => {
            analysics.process(event);
        });
        changeStream.on('error', err => {
            console.log(err);
            changeStream.close()
            throw err;
        });
    } catch (err) {
        console.log(err.stack);
    }
})();