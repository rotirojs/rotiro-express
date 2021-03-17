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
exports.expressRouter = void 0;
const rotiro_1 = require("rotiro");
const express_response_1 = require("./express-response");
function expressRouter(api) {
    return (request, response) => __awaiter(this, void 0, void 0, function* () {
        const expressResponse = new express_response_1.ExpressResponse(request, response);
        rotiro_1.Api.handleRequest(api, expressResponse);
    });
}
exports.expressRouter = expressRouter;
//# sourceMappingURL=index.js.map