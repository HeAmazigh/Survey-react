const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

let result = {};

app.post('/survey',( req, res) => {
    if (req.body.email in result) {
        result[req.body.email].push(req.body.data);
        console.log(result);
    }else{
        result[req.body.email] = [];
        result[req.body.email].push(req.body.data);
        console.log(result);
    }
});

app.get('/:email/survey', (req, res) => {
    if (req.params.email === undefined) {
        res.json([]);
    } else {
        const data = result[req.params.email];
        //console.log(req.params.email);
        res.json(data);
    }
})

app.get('/',(req, res) => {
    res.send('OK');
})

const port = process.env.PORT || 5000;

app.listen(port);
console.log('App runinig in port: ', port);