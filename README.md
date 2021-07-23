


# REVIEW THE LOG FILE (time: 5 minutes)

- mainly noticed a server request interupted with status 503 and a request timeout with status 503. 

# PULL REQUEST REVIEW (time: 30 minutes)
- Was looking for a blocker but couldn't find one. Maybe I was thrown off by the use of critical or I really missed a major issue. In any case, here's what I found by order of importance.
- SurveyDropdown.tsx line 51. Is missing the usual key prperty. 
- api/spec/tests/Surveys.spec.ts new test is missing bad request handling.
- api/src/routes/Surveys.ts new getSurveys method code doc need updating.

# WRITE CODE (time: 1 hour)
- This is this depository
