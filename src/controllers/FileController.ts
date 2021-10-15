import { ResponseWrapperUtil } from "../utils/ResponseWrapperUtil";
import { CommonUtil } from "../utils/CommonUtil";
import { AppConstants } from "../config/AppConstants";
import { Request, Response } from 'express';
import * as _ from 'lodash';
export class FileController {
    constructor() {

    }
    uploadFiles(req: Request, res: Response) {
        ResponseWrapperUtil.sendSuccessResponse(res, {
            apiId: CommonUtil.getApiId("file-upload"),
            responseCode: AppConstants.RESPONSE_CODES.OK,
            message: "File uploaded succesfully",
            data: {
                files: req.files
            }
        });
    }
}