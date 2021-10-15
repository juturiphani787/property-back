import { AppConstants } from "../config/AppConstants";
import * as jwt from "jsonwebtoken";
import { DateTimeUtil } from "./DateTimeUtil";
export class JwtUtil {
  generateAuthToken(data: any) {
    data["expiresOn"] = DateTimeUtil.getTimeStamp(
      AppConstants.TOKEN_EXPIRY_TIME
    );
    let token = jwt.sign(data, AppConstants.JWT_KEY);
    return token;
  }

  validateAndExtractToken(token: any) {
    try {
      let tokenData: any = jwt.verify(token, AppConstants.JWT_KEY);
      let currentTimeStamp = DateTimeUtil.getTimeStamp(0);
      if (tokenData["expiresOn"] < currentTimeStamp) {
        throw new Error("Token expired");
      }
      return tokenData;
    } catch (err) {
      let error = err ? err : new Error("Invalid token");
      throw error;
    }
  }
}
