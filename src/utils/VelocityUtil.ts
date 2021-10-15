import { AppConstants } from "../config/AppConstants";
import { parse, Compile } from 'velocityjs';

export class VelocityUtil {
    static compileText(template: string, contextData: any) {
        const asts = parse(template);
        return (new Compile(asts)).render(contextData);
    }
}