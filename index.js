const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config();

const { monitorQueue, createJob } = require('./batch')

let queue = []; //store incoming request here

const colorsArray = ["\x1b[46m%s\x1b[0m", "\x1b[44m%s\x1b[0m", "\x1b[32m%s\x1b[0m", "\x1b[41m%s\x1b[0m", "\x1b[43m%s\x1b[0m"]

app.use(bodyParser.urlencoded({ extended: false} ));

app.use(bodyParser.json());

app.post('/api/print', async (req, res) => {
    const job = createJob(() => processMessage(req.body.message))
    queue.push(job)
    console.log('pushed item to queue')
    res.status(200).json({message: 'Request Successfully added for Batch Processing!!!'})
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Batch App is running on port ${process.env.PORT || 3000}`)
})

processMessage = async (msg) => {
    return new Promise(async (resolve) => {
        let rand = Math.random() * 4;
        rand = Math.floor(rand);
        console.log('rand ',rand)
        console.log(colorsArray[rand], `${new Date()} | Logging | ${msg}`)
        resolve('resolved')
    })
    
}

setInterval(async () => {
    await monitorQueue(queue)
}, process.env.QUEUE_MONITORING_INTERVAL)