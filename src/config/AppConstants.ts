export class AppConstants {
  static APP_NAME: string = "Zuqo";
  static TOKEN_EXPIRY_TIME: number = 5 * 24 * 60 * 60; // in seconds
  static OTP_EXPIRY_TIME: number = 24 * 60 * 60; // in seconds
  static DEFAULT_DATE_FORMAT: string = "YYYY-MM-DD";
  static DEFAULT_DATE_FORMAT_DB: string = "YYYY-MM-DD HH:MM:SS";
  static DEFAULT_DATE_TIME_FORMAT: string = "YYYY-MM-DD HH:MM:SS";
  static RESPONSE_CODES: any = {
    OK: "OK",
    FAIL: "FAIL",
    NOT_FOUND: "NOT_FOUND"
  };
  static JWT_KEY = process.env.JWT_KEY || "CVBA%$%SDF%7578ETYETE#%&*&HJJSHSJ@@@SSGSDH";
  static FILE_UPLOAD_FOLDER = "uploads/";
  static FILE_DOCUMENT_UPLOAD_FOLDER = "ocr/";
  static FILE_UPLOAD_MAX_COUNT = 12;
  static FILE_UPLOAD_MAX_SIZE = 5; // in mb
  static UUID_PREFIXES = {

  };
  static USER_TYPES: any = { admin: 'admin', SUPERVISOR: 'supervisor', SUPER_AGENT: 'superagent', AGENT: 'agent' }
  static DEFAULT_PAGE_LIMIT = 10;

  static USER_STATUS = {
    PENDING: 'pending',
    ACTIVE: 'active',
    IN_ACTIVE: 'inactive'
  }

  static LOG_SETTING = {
    LOG_FILE_PATH: './logs/'
  }

  static EMAIL = {
    SEND_GRID_API_KEY: process.env.SEND_GRID_API_KEY,
    EMAIL_FROM: process.env.EMAIL_ORDERS_FROM || 'noreply@instadesk.io',
    SIGNATURE_TEXT: '<i>Regards,<br />Team InstaDesk</i>'
  }

}
