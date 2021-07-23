"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SurveyResponse {
    constructor(idOrResponse, content, completed) {
        if (typeof idOrResponse === 'number') {
            this.id = idOrResponse || -1;
            this.content = content || { "questions": [] };
            if (typeof completed === 'string') {
                this.completed = new Date(completed);
            }
            else {
                this.completed = completed || new Date();
            }
        }
        else {
            this.content = idOrResponse.content;
            this.id = idOrResponse.id;
            if (typeof idOrResponse.completed === 'string') {
                this.completed = new Date(idOrResponse.completed);
            }
            else {
                this.completed = idOrResponse.completed || new Date();
            }
        }
    }
}
exports.default = SurveyResponse;
