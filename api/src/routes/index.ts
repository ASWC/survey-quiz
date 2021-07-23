import { Router } from 'express';
import { getSurvey, getSurveys } from './Surveys';
import { addResponse } from './Responses'
import { getReport } from './Report';

// Survey routes
const surveyRouter = Router();
surveyRouter.get('/', getSurveys);
surveyRouter.get('/:id', getSurvey);

// Response routes
const responseRouter = Router();
responseRouter.post('/', addResponse);

const reportRouter = Router();
reportRouter.get('/', getReport);

// Export the base-router
const baseRouter = Router();
baseRouter.use('/surveys', surveyRouter);
baseRouter.use('/responses', responseRouter);
baseRouter.use('/report', reportRouter);
export default baseRouter;
