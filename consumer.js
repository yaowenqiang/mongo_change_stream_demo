'use strict'
const common = require('./common')

class Consumer {
    constructor(topic, detailed = true) {
        this.topic = topic;
        this.detailed = detailed;
    }

    process(ext) {
        console.log(`*** Processor "${this.topic}" got operationType ${ext.operationType} ***`);
        if (this.detailed) {
            common.prettyDoc(ext.fullDocument);
        }
    }
}

module.exports = Consumer;