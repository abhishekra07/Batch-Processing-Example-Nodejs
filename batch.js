const Constants = require('./constanst');

const batchQueue = []; //ill store batch requetes here.
let lastBatchProcessingTime = Date.now(); //will keep track of last processing time
let batchStatus = Constants.IDLE; //store current batch status

/**
 * 
 * @param {*} queue | incoming requtes from client
 */
exports.monitorQueue = async (queue) => {
    //If Batch is in idle state then only proceed further
    if(batchStatus === Constants.IDLE) {
        await pushToBatchQueue(queue);
    }
}

/**
 * Push incoming requests to Batch Queue for processing
 */
pushToBatchQueue = async (queue) => {
    let spaceRemaining = process.env.BATCH_SIZE - batchQueue.length //calculate space remaining to push into batch queue
    let noOfJobsToPush = Math.min(queue.length, spaceRemaining) // calculate how many no of records to pop
    let jobs = queue.splice(0, noOfJobsToPush) // jobs to push
    batchQueue.push(...jobs); // adding jobs to batchQueue for processing
}
