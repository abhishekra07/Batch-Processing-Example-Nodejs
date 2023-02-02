const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const { monitorQueue, createJob } = require('./batch')

let queue = []; //store incoming request here

app.use(bodyParser.urlencoded({ extended: false} ));

app.use(bodyParser.json());

app.post('/api/print', async (req, res) => {
    let job = createJob(async () => processMessage(req.body.message))
    queue.push(job)
    res.status(200).json({message: 'Request Successfully added for Batch Processing!!!'})
})

processMessage = async (msg) => {
    console.log('\x1b[33m%s\x1b[0m', `${new Date()} | Logging | ${msg}`);
}

setInterval(async () => {
    await monitorQueue(queue)
}, process.env.QUEUE_MONITORING_INTERVAL)