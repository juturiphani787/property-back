import moment from "moment";
import { AppConstants } from "../config/AppConstants";
export class DateTimeUtil {
  static getCurrentDate(format?: string) {
    format = format || AppConstants.DEFAULT_DATE_FORMAT;
    return moment(new Date()).format(format);
  }

  static getCurrentDateTime(format?: string) {
    format = format || AppConstants.DEFAULT_DATE_TIME_FORMAT;
    return moment(new Date()).format(format);
  }

  static getTimeStamp(seconds?: number) {
    seconds = seconds || 0;
    return moment(new Date())
      .add(seconds, "seconds")
      .valueOf();
  }
}
