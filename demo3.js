'use strict';
const common = require('./common');
const Consumer = require('./consumer');
const CartStatus = require('./cart_status');
const cart_status = require('./cart_status');

const TokenManager = require('./token_manager');

const analysics = new Consumer('analysics', false);

(async function() {
    try {
        const tokenManager = new TokenManager();
        const lastToken = tokenManager.load();

        const collection = await common.getCollection('cart');
        const options = {fullDocument: 'updateLookup', resumeAfter: lastToken};
        const pipeline = [{$match: {'fullDocument.status': CartStatus.SHIP}}]
        const changeStream = collection.watch(pipeline, options);
        changeStream.on('change', event => {
            analysics.process(event);
            tokenManager.save(event._id);
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