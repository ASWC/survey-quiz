import { ISurvey } from "./Survey";

interface IAnswerCount {
    name: string;
    count:number;
}

export interface ISurveyReport {
    id: number;
    name: string;
    content: IAnswerCount[];
}