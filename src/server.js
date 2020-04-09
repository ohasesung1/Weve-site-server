require('dotenv').config();

const express= require('express');
const http = require('http');
const bodyParser = require('body-parser');
const api = require('./api');
const cors = require('cors');
const colorConsole = require('./lib/console');

const app = express();
const server = http.createServer(app);
const {PORT : port} = process.env;
     
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express());
app.use(cors());

app.use(api);
app.use('/', express.static('public'));

server.listen(port, () => {
  colorConsole.yellow(`Server listening to port = ${port}`);
});