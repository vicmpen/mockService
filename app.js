const express = require('express');
const http = require('http');
const bodyParser = require('body-parser')
const morgan = require('morgan');
// const mongoose = require('mongoose')
const router = require('./arouter');
const cors = require('cors');


const  app = express();

// mongoose.connect('mongodb://localhost:auth/auth');

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({type:'*/*'}));

router(app)

//server setup

const port = process.env.PORT || 3090;
const server  = http.createServer(app);
server.listen(port);
console.log('Server listening oooon :', port)