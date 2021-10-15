import { AppConstants } from "../config/AppConstants";
export interface SmsPayload {
    receipient: string;
    templateId: string;
    context?: any;

}
export class SmsUtil {
    static sendSms(payload: SmsPayload) {

    }
}