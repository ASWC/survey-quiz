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
exports.getSurvey = exports.getSurveys = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const SurveyDao_mock_1 = __importDefault(require("@daos/Survey/SurveyDao.mock"));
const surveyDao = new SurveyDao_mock_1.default();
const { NOT_FOUND, OK } = http_status_codes_1.default;
/**
 * Get one survey, by ID.
 *
 * @param req The Express Request.
 * @param res The Express Response.
 * @returns
 *   On success returns the survey as JSON `{"survey": {...}}`.
 *   If the survey ID isn't found, returns a 404 with an empty body.
 */
function getSurveys(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const surveys = yield surveyDao.getAll();
        if (surveys) {
            return res.status(OK)
                .json({ surveys });
        }
        else {
            return res.status(NOT_FOUND).end();
        }
    });
}
exports.getSurveys = getSurveys;
/**
 * Get one survey, by ID.
 *
 * @param req The Express Request.
 * @param res The Express Response.
 * @returns
 *   On success returns the survey as JSON `{"survey": {...}}`.
 *   If the survey ID isn't found, returns a 404 with an empty body.
 */
function getSurvey(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const idNumber = Number(id);
        const survey = yield surveyDao.getOne(idNumber);
        if (survey) {
            return res.status(OK)
                .json({ survey });
        }
        else {
            return res.status(NOT_FOUND).end();
        }
    });
}
exports.getSurvey = getSurvey;
