import app from "./app";
import { MongoConfig } from "./config/MongoConfig";
import * as _ from "lodash";

let fs = require('fs');
let path = require('path');
let cron = require("node-cron");
let https = require("https");
let io = require('socket.io')(https);
let mongoose = require('mongoose');


let createServer = https.createServer({
  key: fs.readFileSync(path.join(__dirname + '/../cert/comforter_app.key')),
  cert: fs.readFileSync(path.join(__dirname + '/../cert/comforter_app.pem'))
}, app);

mongoose.connect(MongoConfig.SETUP.URL, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('connecting', () => {
  console.log('connecting to MongoDB...');
});

db.on('error', (err: any) => {
  console.error('Error in MongoDb connection: ' + err);
  mongoose.disconnect();
});


/**
 * Start Express server.
 */
const server = createServer.listen(app.get("port"), () => {
  db.on('connected', () => {
    console.log(`Server is running on port ${app.get("port")}`)
    console.log("  Press CTRL-C to stop\n");
  });
});



export default server;