import { Api, RotiroMiddleware } from 'rotiro';
import { ExpressResponse } from './express-response';

export function expressRouter(api: Api) {
  return async (request: any, response: any) => {
    const expressResponse: RotiroMiddleware = new ExpressResponse(
      request,
      response
    );
    Api.handleRequest(api, expressResponse);
  };
}
