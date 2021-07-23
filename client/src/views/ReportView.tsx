import { useEffect, useState } from "react";
import { ISurveyReport } from "../entities/SurveyReport";
import {Button} from 'react-bootstrap';
import { useHistory } from "react-router-dom";

interface IReportProps 
{
    
}

const ReportView = (props: IReportProps) => 
{
    const history = useHistory();
    const [reports, setSurveyReports] = useState<ISurveyReport[] | null>(null);

    useEffect(() => {
        const loadReports = async (): Promise<void> => {
            const response = await fetch(`http://localhost:2047/api/report`);
            let data;
            try {
                data = await response.json();
            } catch(error) {
                console.error(error);
                data = null;
            }
            if (response.ok) {
                setSurveyReports(data.reports);
            } else {
                console.error(`API failure: ${response.status}`, data);
            }
        }
        loadReports();
    }, [props]);

    const getReport = (report:ISurveyReport)=>
    {
        return <div className="container">
            <div className="row">
                <div className="col-12" >
                    <h2>{report.name}</h2>
                </div>                
            </div>
            <div className="row">
                <div className="col-12">
                        <Button                
                            className=""
                            variant="success"               
                            onClick={event => {
                                event.stopPropagation();
                                history.push('/survey/' + report.id)
                                }}
                        >
                        Take this Survey
                    </Button>
                </div>                
            </div>   
            <div className="row">
                <div className="col-12">
                    <h5>Answer Count Report:</h5>
                </div>                
            </div>
            <div className="row">
                <ul>
                {report.content.map((answer, id) => <li key={id}>{"Answer: " + answer.name + ". Total Count: " + answer.count}</li>)}
                </ul>
            </div>
        </div>
    }

    if(!reports)
    {
        return <div>Loading ...</div>
    }

    return <>
        <div >
            <div style={{paddingTop:"50px", paddingBottom:"50px", paddingLeft:"50px"}}>
            
            </div>   
            {reports.map(report => getReport(report))}            
        </div>
    </>;
}

export default ReportView;