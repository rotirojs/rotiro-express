import { RequestDetail, RotiroMiddleware } from 'rotiro';

export class ExpressResponse implements RotiroMiddleware {
  private readonly _requestDetail: RequestDetail;

  constructor(private readonly request: any, private readonly response: any) {
    const headers: Record<string, string> = {};

    if (this.request.headers) {
      // copy the headers over and make all keys lower case
      for (const header of Object.keys(this.request.headers)) {
        headers[header.toLowerCase()] = this.request.headers[header];
      }
    }

    this._requestDetail = {
      method: this.request.method,
      url: this.request.originalUrl,
      body: this.request.body,
      headers,
      originalRequest: this.request
    };
  }

  public get requestDetail(): RequestDetail {
    return this._requestDetail;
  }

  public sendResponse(
    body: any,
    status?: number,
    contentType?: string,
    headers?: Record<string, string>
  ) {
    if (headers) {
      for (const headerKey of Object.keys(headers)) {
        this.response.setHeader(headerKey, headers[headerKey]);
      }
    }
    this.response.type(contentType || 'text/plain');
    this.response.status(status || 200).send(String(body));
  }
}
