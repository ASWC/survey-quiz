import Survey, { ISurvey } from '@entities/Survey';
import { getRandomInt } from '@shared/functions';
import { ISurveyDao } from './SurveyDao';
import MockDaoMock from '../MockDb/MockDao.mock';
import { SurveyReport } from '../../entities/SurveyReport';

interface ISurveytDic
{
    [name:string]:SurveyReport;
}

class SurveyDao extends MockDaoMock implements ISurveyDao {


    public async getOne(id: number): Promise<ISurvey | null> {
        const db = await super.openDb();
        for (const survey of db.surveys) {
            if (survey.id === id) {
                return survey;
            }
        }
        return null;
    }

    public async getReports(): Promise<SurveyReport[] | null> {
        const db = await super.openDb();
        let surveydic:ISurveytDic = {};
        let surveyreports:SurveyReport[] = [];
        for (const surveydata of db.surveys) 
        {
            let survey:SurveyReport = new SurveyReport(surveydata);     
            surveydic[survey.id] = survey;
            surveyreports.push(survey);
        }
        for (const response of db.responses) 
        {
            let question = response.content.questions[0];
            if(!question)
            {
                continue;
            }
            let survey:SurveyReport = surveydic[question.surveyid];
            if(!survey)
            {
                continue;
            }
            survey.addCount(question);
        }
        return surveyreports;
    }


    public async getAll(): Promise<ISurvey[]> {
        const db = await super.openDb();
        return db.surveys;
    }


    public async add(Survey: ISurvey): Promise<void> {
        const db = await super.openDb();
        Survey.id = getRandomInt();
        db.surveys.push(Survey);
        await super.saveDb(db);
    }


    public async update(Survey: ISurvey): Promise<void> {
        const db = await super.openDb();
        for (let i = 0; i < db.surveys.length; i++) {
            if (db.surveys[i].id === Survey.id) {
                db.surveys[i] = Survey;
                await super.saveDb(db);
                return;
            }
        }
        throw new Error('Survey not found');
    }


    public async delete(id: number): Promise<void> {
        const db = await super.openDb();
        for (let i = 0; i < db.surveys.length; i++) {
            if (db.surveys[i].id === id) {
                db.surveys.splice(i, 1);
                await super.saveDb(db);
                return;
            }
        }
        throw new Error('Survey not found');
    }
}

export default SurveyDao;
