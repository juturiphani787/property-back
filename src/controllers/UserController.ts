import { UserService } from "./../services/UserService";
import { Request, Response } from "express";
import { ResponseWrapperUtil } from "../utils/ResponseWrapperUtil";
import { CommonUtil } from "../utils/CommonUtil";
import { AppConstants } from "../config/AppConstants";


export class UserController {
  userService: UserService = new UserService();

  constructor() { }
  createUser = (req: Request, res: Response) => {
    this.userService.createUser(req.body.request, res.locals.user).then(
      result => {
        ResponseWrapperUtil.sendSuccessResponse(res, {
          apiId: CommonUtil.getApiId("create-user"),
          responseCode: AppConstants.RESPONSE_CODES.OK,
          message: "User created succesfully"
        });
      },
      err => {
        ResponseWrapperUtil.sendErrorResponse(res, {
          apiId: CommonUtil.getApiId("create-user"),
          responseCode: AppConstants.RESPONSE_CODES.FAIL,
          message: "Error in sign up",
          error: err.message
        });
      }
    );
  };

  userLogin = (req: Request, res: Response) => {
    this.userService.userLogin(req.body.request).then(
      result => {
        ResponseWrapperUtil.sendSuccessResponse(res, {
          apiId: CommonUtil.getApiId("user-login"),
          responseCode: AppConstants.RESPONSE_CODES.OK,
          data: result,
          message: "User Login successful"
        });
      },
      err => {
        ResponseWrapperUtil.sendErrorResponse(res, {
          apiId: CommonUtil.getApiId("user-login"),
          responseCode: AppConstants.RESPONSE_CODES.FAIL,
          message: err.message || "Error in login",
          error: err.message
        });
      }
    );
  };

  userLoggedOut = (req: Request, res: Response) => {
    this.userService.userLoggedOut(req.body.request).then(
      result => {
        ResponseWrapperUtil.sendSuccessResponse(res, {
          apiId: CommonUtil.getApiId("user-login"),
          responseCode: AppConstants.RESPONSE_CODES.OK,
          message: "User Loggout successful"
        });
      },
      err => {
        ResponseWrapperUtil.sendErrorResponse(res, {
          apiId: CommonUtil.getApiId("user-login"),
          responseCode: AppConstants.RESPONSE_CODES.FAIL,
          message: 'User not logged in',
          error: 'User not logged in'
        });
      }
    );
  };

  listAllRegisterUsers = (req: Request, res: Response) => {
    this.userService.listAllRegisterUsers(req.body.request).then(
      result => {
        ResponseWrapperUtil.sendSuccessResponse(res, {
          apiId: CommonUtil.getApiId("listAllRegisterUsers"),
          responseCode: AppConstants.RESPONSE_CODES.OK,
          message: "Succes",
          data:result
        });
      },
      err => {
        ResponseWrapperUtil.sendErrorResponse(res, {
          apiId: CommonUtil.getApiId("listAllRegisterUsers"),
          responseCode: AppConstants.RESPONSE_CODES.FAIL,
          message: "Error",
          error: err.message
        });
      }
    );
  };

  listUserBookings = (req: Request, res: Response) => {
    this.userService.listUserBookings(req.body.request).then(
      result => {
        ResponseWrapperUtil.sendSuccessResponse(res, {
          apiId: CommonUtil.getApiId("listUserBookings"),
          responseCode: AppConstants.RESPONSE_CODES.OK,
          message: "Succes",
          data:result
        });
      },
      err => {
        ResponseWrapperUtil.sendErrorResponse(res, {
          apiId: CommonUtil.getApiId("listUserBookings"),
          responseCode: AppConstants.RESPONSE_CODES.FAIL,
          message: "Error",
          error: err.message
        });
      }
    );
  };

  listBookings = (req: Request, res: Response) => {
    this.userService.listBookings(req.body.request).then(
      result => {
        ResponseWrapperUtil.sendSuccessResponse(res, {
          apiId: CommonUtil.getApiId("listBookings"),
          responseCode: AppConstants.RESPONSE_CODES.OK,
          message: "Succes",
          data:result
        });
      },
      err => {
        ResponseWrapperUtil.sendErrorResponse(res, {
          apiId: CommonUtil.getApiId("listBookings"),
          responseCode: AppConstants.RESPONSE_CODES.FAIL,
          message: "Error",
          error: err.message
        });
      }
    );
  };


}
