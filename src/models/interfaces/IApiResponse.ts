export interface IApiResponse {
    apiId: string;
    responseCode: string;
    data?: object;
    message?: string;
    error?: any;
}