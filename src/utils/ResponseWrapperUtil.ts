import { IApiResponse } from "../models/interfaces/IApiResponse";
import HttpStatus from 'http-status-codes';
import { Request, Response } from "express";
import { DateTimeUtil } from "./DateTimeUtil";
export class ResponseWrapperUtil {

    static sendSuccessResponse(res: Response, data: IApiResponse) {
        res.status(HttpStatus.OK).send({
            id: data.apiId,
            ts: DateTimeUtil.getCurrentDateTime(),
            response: {
                code: data.responseCode,
                message: data.message,
                data: data.data
            }
        });
    }

    static sendResourceNotFoundResponse(res: Response, data: IApiResponse) {
        res.status(HttpStatus.NOT_FOUND).send({
            id: data.apiId,
            ts: DateTimeUtil.getCurrentDateTime(),
            response: {
                code: data.responseCode,
                message: data.message
            }
        });
    }

    static sendBadRequestResponse(res: Response, data: IApiResponse) {
        res.status(HttpStatus.BAD_REQUEST).send({
            id: data.apiId,
            ts: DateTimeUtil.getCurrentDateTime(),
            response: {
                code: data.responseCode,
                message: data.message,
                error: data.error
            }
        });
    }

    static sendAuthErrorResponse(res: Response, data: IApiResponse) {
        res.status(HttpStatus.UNAUTHORIZED).send({
            id: data.apiId,
            ts: DateTimeUtil.getCurrentDateTime(),
            response: {
                code: data.responseCode,
                message: data.message,
                error: data.error
            }
        });
    }

    static sendErrorResponse(res: Response, data: IApiResponse) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
            id: data.apiId,
            ts: DateTimeUtil.getCurrentDateTime(),
            response: {
                code: data.responseCode,
                message: data.message,
                error: data.error
            }
        });
    }

}