import { AppConstants } from "../config/AppConstants";
import uniqid from "uniqid";

const padNo = (num: number, size?: number) => {
    var s = String(num);
    while (s.length < (size || 2)) { s = "0" + s; }
    return s;
}

export class CommonUtil {
    constructor() { }
    static getApiId(id: String) {
        return `${AppConstants.APP_NAME}.api.${id}`;
    }
    static getUuid(prefix?: string) {
        return uniqid.time(prefix);
    }
    static getTimeFromSlot(slotObj: any) {
        let time = '';
        time = (slotObj.hour >= 0) ? time + slotObj.hour.toString() : '00';
        time = (slotObj.minute >= 0) ? time + ':' + padNo(slotObj.minute).toString() : time + ':00';
        return time;
    }

}
