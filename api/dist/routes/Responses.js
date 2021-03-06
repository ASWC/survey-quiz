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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addResponse = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const ResponseDao_mock_1 = __importDefault(require("@daos/Response/ResponseDao.mock"));
const constants_1 = require("@shared/constants");
const responseDao = new ResponseDao_mock_1.default();
const { BAD_REQUEST, CREATED, OK } = http_status_codes_1.default;
/**
 * Add a response.
 *
 * @param req The Express Request.
 * @param res The Express Response.
 * @returns
 *   On success returns 201 created with an empty body.
 *   If the parameters are invalid, returns a 400 with an JSON object describing the error.
 */
function addResponse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { response } = req.body;
        if (!response) {
            return res.status(BAD_REQUEST)
                .json({ error: constants_1.paramMissingError });
        }
        yield responseDao.add(response);
        return res.status(CREATED).end();
    });
}
exports.addResponse = addResponse;
