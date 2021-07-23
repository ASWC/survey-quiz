import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import SurveyDropdown from "./components/SurveyDropdown";
import SurveyView from "./views/SurveyView"
import { Container, Button } from "react-bootstrap";
import ReportView from "./views/ReportView";

function App() {
  return (
    <Router>   
        <Switch>
          <Route path="/survey/:id" render={props => {
            return (
              <Container className="main pad-t">
                  <SurveyDropdown />
                  <SurveyView surveyId={Number(props.match.params.id)} /> 
              </Container>)
          }}>
          </Route> 
          <Route path="/report">
            <ReportView />
          </Route>
        </Switch>      
    </Router>
  );
}

export default App;