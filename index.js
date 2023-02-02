const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const { monitorQueue } = require('./batch');

let queue = []; //store incoming request here

app.use(bodyParser.urlencoded({ extended: false} ));

app.use(bodyParser.json());

app.post('/api/print', async (req, res) => {
    
})