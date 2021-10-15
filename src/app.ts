import express from "express";
import bodyParser from "body-parser";
import { Routes } from "./routes";
import helmet from "helmet";
import cors from "cors";
import fetch from "node-fetch";
import { RoleAccess } from "./middlewares/access-rules/RoleAccess";


const cron = require("node-cron");
const https = require("https");
var fs = require('fs');
var path = require('path');

// Create Express server
const app = express();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



// Express configuration
app.set("port", process.env.PORT || 7002);
app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
app.use(express.static('../uploads'));
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
let roleAccess = new RoleAccess();
app.use(roleAccess.verifyAccessRole);
let routePrv: Routes = new Routes();
routePrv.routes(app);

export default app;
