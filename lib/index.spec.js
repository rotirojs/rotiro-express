"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const rotiro_1 = require("rotiro");
const index_1 = require("./index");
jest.mock('rotiro');
describe('middleware/express', () => {
    let api;
    beforeEach(() => {
        rotiro_1.Api.handleRequest = jest.fn();
        api = new rotiro_1.Api();
    });
    describe('router', () => {
        it('Return a middleware handler', () => {
            const middleware = index_1.expressRouter(api);
            expect(typeof middleware).toEqual('function');
        });
        it('Call api handleRequest', () => __awaiter(void 0, void 0, void 0, function* () {
            const request = {};
            const response = {};
            const middleware = index_1.expressRouter(api);
            yield middleware(request, response);
            expect(rotiro_1.Api.handleRequest).toBeCalled();
        }));
    });
});
//# sourceMappingURL=index.spec.js.map