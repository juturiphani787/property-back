import multer from 'multer';
import uuid from 'uuid';
import * as path from 'path';
import { Request, Response } from "express";
import { AppConstants } from '../config/AppConstants';
var fs = require('fs');
export class FileUtil {
    static storage: any;
    static upload: any;

    static uploader() {
        let fullDate = new Date();

        //console.log("Dates",fullDate);
        let year = fullDate.getFullYear();
        let month = fullDate.getMonth();
        let date = fullDate.getDate();
        //console.log("Dates",year, month, date);

        this.storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, path.join(__dirname + '/../../' + AppConstants.FILE_UPLOAD_FOLDER))
            },
            filename: function (req, file, cb) {
                cb(null, uuid.v4() + path.extname(file.originalname));
            }
        })
        this.upload = multer({ storage: this.storage });
        return this.upload;
    }

//document uploader
    static documentUploader() {

        var fullDate = new Date();
        //console.log("Dates", fullDate);
        var year = fullDate.getFullYear();
        var month = ("0" + (fullDate.getMonth() + 1)).slice(-2);
        var date = ("0" + fullDate.getDate()).slice(-2);
        //console.log("Dates", year, month, date);
        var dir = path.join(__dirname + '/../../' + AppConstants.FILE_DOCUMENT_UPLOAD_FOLDER);
        if (!fs.existsSync(dir + year)) {
            fs.mkdirSync(dir + year);
        }
        dir = path.join(__dirname + '/../../' + AppConstants.FILE_DOCUMENT_UPLOAD_FOLDER + year + '/');
        if (!fs.existsSync(dir + month)) {
            fs.mkdirSync(dir + month);
        }
        dir = path.join(__dirname + '/../../' + AppConstants.FILE_DOCUMENT_UPLOAD_FOLDER + year + '/' + month + '/');
        if (!fs.existsSync(dir + date)) {
            fs.mkdirSync(dir + date);
        }
        dir = path.join(__dirname + '/../../' + AppConstants.FILE_DOCUMENT_UPLOAD_FOLDER + year + '/' + month + '/' + date + '/');


        this.storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, dir)
            },
            filename: function (req, file, cb) {
                cb(null, uuid.v4() + path.extname(file.originalname));
            }
        })
        this.upload = multer({ storage: this.storage });
        return this.upload;
    }

}