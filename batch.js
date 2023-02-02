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

pushToBatchQueue = async (queue) => {
    let spaceRemaining = process.env.BATCH_SIZE - batchQueue.length; //calculate space remaining to push into batch queue
    let noOfJobsToPush = Math.min(queue.length, spaceRemaining); //

}
