"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Surveys_1 = require("./Surveys");
const Responses_1 = require("./Responses");
// Survey routes
const surveyRouter = express_1.Router();
surveyRouter.get('/', Surveys_1.getSurveys);
surveyRouter.get('/:id', Surveys_1.getSurvey);
// Response routes
const responseRouter = express_1.Router();
responseRouter.post('/', Responses_1.addResponse);
// Export the base-router
const baseRouter = express_1.Router();
baseRouter.use('/surveys', surveyRouter);
baseRouter.use('/responses', responseRouter);
exports.default = baseRouter;
