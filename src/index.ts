import { Api, RotiroMiddleware } from 'rotiro';
import { trimString } from 'rotiro/lib/utils';
import { ExpressResponse } from './express-response';

export function expressRouter(api: Api | Record<string, Api>) {
  return async (request: any, response: any) => {
    const expressResponse: RotiroMiddleware = new ExpressResponse(
      request,
      response
    );
    // Check to see if this is a single instance of the api or a list of host names
    if (api.use && typeof api.use === 'function') {
      await Api.handleRequest(api as Api, expressResponse);
    } else {
      // Multiple api definitions are defined against different hostnames
      const apiHosts: Record<string, Api> = api as Record<string, Api>;
      const hostName: string = trimString(request.hostname).toLowerCase();
      if (apiHosts[hostName]) {
        await Api.handleRequest(apiHosts[hostName], expressResponse);
      } else {
        response.status(404).send('Not found');
      }
    }
  };
}
