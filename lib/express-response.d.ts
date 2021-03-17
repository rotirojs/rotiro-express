import { RequestDetail, RotiroMiddleware } from 'rotiro';
export declare class ExpressResponse implements RotiroMiddleware {
    private readonly request;
    private readonly response;
    private readonly _requestDetail;
    constructor(request: any, response: any);
    get requestDetail(): RequestDetail;
    sendResponse(body: any, status?: number, contentType?: string): void;
}
//# sourceMappingURL=express-response.d.ts.map