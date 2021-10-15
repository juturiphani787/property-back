import { PropertyManagementService } from "./../services/PropertyManagementService";
import { Request, Response } from "express";
import { ResponseWrapperUtil } from "../utils/ResponseWrapperUtil";
import { CommonUtil } from "../utils/CommonUtil";
import { AppConstants } from "../config/AppConstants";


export class PropertyManagementController {
  propertyManagementService: PropertyManagementService = new PropertyManagementService();

  constructor() { }

  listAllProperties = (req: Request, res: Response) => {
    this.propertyManagementService.listAllProperties(req.body.request).then(
      result => {
        ResponseWrapperUtil.sendSuccessResponse(res, {
          apiId: CommonUtil.getApiId("listAllProperties"),
          responseCode: AppConstants.RESPONSE_CODES.OK,
          message: "Succes",
          data:result
        });
      },
      err => {
        ResponseWrapperUtil.sendErrorResponse(res, {
          apiId: CommonUtil.getApiId("listAllProperties"),
          responseCode: AppConstants.RESPONSE_CODES.FAIL,
          message: "Error",
          error: err.message
        });
      }
    );
  };

  listPropertyRooms = (req: Request, res: Response) => {
    this.propertyManagementService.listPropertyRooms(req.body.request).then(
      result => {
        ResponseWrapperUtil.sendSuccessResponse(res, {
          apiId: CommonUtil.getApiId("listPropertyRooms"),
          responseCode: AppConstants.RESPONSE_CODES.OK,
          message: "Succes",
          data:result
        });
      },
      err => {
        ResponseWrapperUtil.sendErrorResponse(res, {
          apiId: CommonUtil.getApiId("listPropertyRooms"),
          responseCode: AppConstants.RESPONSE_CODES.FAIL,
          message: "Error",
          error: err.message
        });
      }
    );
  };

  addProperty = (req: Request, res: Response) => {
    this.propertyManagementService.addProperty(req.body.request, res.locals.user).then(
      result => {
        ResponseWrapperUtil.sendSuccessResponse(res, {
          apiId: CommonUtil.getApiId("addProperty"),
          responseCode: AppConstants.RESPONSE_CODES.OK,
          message: "Added Succesfully",
          data:result
        });
      },
      err => {
        ResponseWrapperUtil.sendErrorResponse(res, {
          apiId: CommonUtil.getApiId("addProperty"),
          responseCode: AppConstants.RESPONSE_CODES.FAIL,
          message: "Error in submission",
          error: err.message
        });
      }
    );
  };

  addRoom = (req: Request, res: Response) => {
    this.propertyManagementService.addRoom(req.body.request, res.locals.user).then(
      result => {
        ResponseWrapperUtil.sendSuccessResponse(res, {
          apiId: CommonUtil.getApiId("addRoom"),
          responseCode: AppConstants.RESPONSE_CODES.OK,
          message: "Added Succesfully",
          data:result
        });
      },
      err => {
        ResponseWrapperUtil.sendErrorResponse(res, {
          apiId: CommonUtil.getApiId("addRoom"),
          responseCode: AppConstants.RESPONSE_CODES.FAIL,
          message: "Error in submission",
          error: err.message
        });
      }
    );
  };

  addThumbnailImage = (req: Request, res: Response) => {
    this.propertyManagementService.addThumbnailImage(req.body.request).then(
      result => {
        ResponseWrapperUtil.sendSuccessResponse(res, {
          apiId: CommonUtil.getApiId("addThumbnailImage"),
          responseCode: AppConstants.RESPONSE_CODES.OK,
          message: "Added Succesfully"
        });
      },
      err => {
        ResponseWrapperUtil.sendErrorResponse(res, {
          apiId: CommonUtil.getApiId("addThumbnailImage"),
          responseCode: AppConstants.RESPONSE_CODES.FAIL,
          message: "Error in submission",
          error: err.message
        });
      }
    );
  };

  getPropertyById = (req: Request, res: Response) => {
    this.propertyManagementService.getPropertyById(req.body.request).then(
      result => {
        ResponseWrapperUtil.sendSuccessResponse(res, {
          apiId: CommonUtil.getApiId("getPropertyById"),
          responseCode: AppConstants.RESPONSE_CODES.OK,
          message: "Added Succesfully",
          data:result
        });
      },
      err => {
        ResponseWrapperUtil.sendErrorResponse(res, {
          apiId: CommonUtil.getApiId("getPropertyById"),
          responseCode: AppConstants.RESPONSE_CODES.FAIL,
          message: "Error in submission",
          error: err.message
        });
      }
    );
  };



}
