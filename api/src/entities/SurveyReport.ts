import { ISurvey } from "./Survey";
import { IQuestion } from "./SurveyResponse";

interface IAnswerCount {
    name: string;
    count:number;
}

export interface ISurveyReport {
    id: number;
    name: string;
    content: IAnswerCount[];
    addCount(question:IQuestion):void;
}

export class SurveyReport implements ISurveyReport 
{
    public id: number;
    public name: string;
    public content: IAnswerCount[];

    constructor(survey:ISurvey) 
    {
        this.id = survey.id;
        this.name = survey.name;
        this.content = [];
        for (const answer of survey.content.questions[0].answers)
        {
            this.content.push({count:0, name:answer});
        }
    }

    public addCount(question:IQuestion):void
    {
        for(let answer of this.content)
        {
            if(answer.name === question.answer)
            {
                answer.count++;
            }
        }
    }
}
