import { Request, Response } from 'express';
import { AppConstants } from '../../config/AppConstants';
import { ResponseWrapperUtil } from '../../utils/ResponseWrapperUtil';
import { CommonUtil } from '../../utils/CommonUtil';
import { JwtUtil } from '../../utils/JwtUtil';
export class RoleAccess {

    urlAccess: any = {
        admin: [
            '/user/create', '/user/list', '/master/add', '/master/list', '/master/update','/upload/add','/upload/list','/send/mail','/receive/mail','/campaign/list'
        ],
        ALL: ['/test', '/master/list', '/user/login', '/file/upload', '/files/:fileName', '/call-request', '/call-request/:id',,'/upload/add','/upload/list','/send/mail','/receive/mail','/campaign/list'
        ]
    }
    constructor() {

    }
    sendAuthErrorResponse = (res: Response) => {
        ResponseWrapperUtil.sendAuthErrorResponse(res, {
            apiId: CommonUtil.getApiId('*'),
            responseCode: AppConstants.RESPONSE_CODES.FAIL,
            message: 'You are not authorized to access this url.'
        })
    }
    urlExists(urls: Array<string>, reqUrl: string) {
        let exists = false;
        urls.forEach((url) => {
            if (url.indexOf(':') >= 0) {
                let urlSegment = url.split('/');
                urlSegment.pop();
                if (reqUrl.indexOf(urlSegment.join('/').toString()) >= 0) {
                    exists = true;
                }
            } else if (url == reqUrl) {
                exists = true;
            }
        });
        return exists;
    }
    verifyAccessRole = (req: Request, res: Response, next: any) => {
        let currentUri = req.url;
        let jwtUtil: JwtUtil = new JwtUtil();
        try {

            // if (this.urlExists(this.urlAccess['ALL'], currentUri)) {
            //     next();
            // } else 
            if (req.headers.authorization) {
                let token = req.headers.authorization;
                let tokenData = jwtUtil.validateAndExtractToken(token);
                let user: any = tokenData;
                res.locals['user'] = user;
                let userType = user['userType'];
                // if (this.urlExists(this.urlAccess[userType], currentUri)) {
                //     next();
                // }
                // else {
                //     this.sendAuthErrorResponse(res);
                // }


            }
            next();
            // else {
            //     this.sendAuthErrorResponse(res);
            // }

        } catch (err) {
            ResponseWrapperUtil.sendBadRequestResponse(res, {
                apiId: CommonUtil.getApiId('*'),
                responseCode: AppConstants.RESPONSE_CODES.FAIL,
                message: err.message || 'Error occured.Try again later'
            })
        }
    }
}