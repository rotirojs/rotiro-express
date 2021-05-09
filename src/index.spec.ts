import { Api } from 'rotiro';
import { expressRouter as router } from './index';

jest.mock('rotiro');

describe('middleware/express', () => {
  let api: Api;
  beforeEach(() => {
    Api.handleRequest = jest.fn();
    api = new Api();
  });

  describe('router', () => {
    it('Return a middleware handler', () => {
      const middleware = router(api);
      expect(typeof middleware).toEqual('function');
    });

    it('Call api handleRequest', async () => {
      const request: any = {};
      const response: any = {};
      const middleware = router(api);
      await middleware(request, response);

      expect(Api.handleRequest).toBeCalled();
    });
  });

  describe('Multiple hostnames', () => {
    it('Return a middleware handler based a hostname', () => {
      const middleware = router({ localhost: api });
      expect(typeof middleware).toEqual('function');
    });

    it('Call api handleRequest', async () => {
      const request: any = { hostname: 'localhost' };
      const response: any = {};
      const middleware = router({ localhost: api });
      await middleware(request, response);

      expect(Api.handleRequest).toBeCalled();
    });

    it('Call different api based on hostname', async () => {
      const response: any = {};

      const api1: Api = new Api();
      const api2: Api = new Api();
      const middleware = router({ localhost: api1, 'rotiro.com': api2 });

      await middleware(
        {
          hostname: 'localhost',
          method: 'GET'
        },
        response
      );

      expect(Api.handleRequest).toBeCalledWith(api1, expect.anything());
      await middleware(
        {
          hostname: 'rotiro.com',
          method: 'GET'
        },
        response
      );

      expect(Api.handleRequest).toBeCalledWith(api2, expect.anything());
    });

    it('does not match a host name', async () => {
      const sendFunc: any = jest.fn();
      const statusFunc: any = jest.fn().mockReturnValue({ send: sendFunc });
      const response: any = { status: statusFunc };

      const api1: Api = new Api();
      const middleware = router({ localhost: api1 });

      await middleware(
        {
          hostname: 'other.host',
          method: 'GET'
        },
        response
      );

      expect(statusFunc).toBeCalledWith(404);
      expect(sendFunc).toBeCalledWith('Not found');
    });
  });
});
