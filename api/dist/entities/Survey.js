"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Survey {
    constructor(nameOrSurvey, content, id) {
        if (typeof nameOrSurvey === 'string') {
            this.name = nameOrSurvey;
            this.content = content || { "questions": [] };
            this.id = id || -1;
        }
        else {
            this.name = nameOrSurvey.name;
            this.content = nameOrSurvey.content;
            this.id = nameOrSurvey.id;
        }
    }
}
exports.default = Survey;
