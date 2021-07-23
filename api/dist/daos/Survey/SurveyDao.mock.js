"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions_1 = require("@shared/functions");
const MockDao_mock_1 = __importDefault(require("../MockDb/MockDao.mock"));
class SurveyDao extends MockDao_mock_1.default {
    getOne(id) {
        const _super = Object.create(null, {
            openDb: { get: () => super.openDb }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield _super.openDb.call(this);
            for (const survey of db.surveys) {
                if (survey.id === id) {
                    return survey;
                }
            }
            return null;
        });
    }
    getAll() {
        const _super = Object.create(null, {
            openDb: { get: () => super.openDb }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield _super.openDb.call(this);
            return db.surveys;
        });
    }
    add(Survey) {
        const _super = Object.create(null, {
            openDb: { get: () => super.openDb },
            saveDb: { get: () => super.saveDb }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield _super.openDb.call(this);
            Survey.id = functions_1.getRandomInt();
            db.surveys.push(Survey);
            yield _super.saveDb.call(this, db);
        });
    }
    update(Survey) {
        const _super = Object.create(null, {
            openDb: { get: () => super.openDb },
            saveDb: { get: () => super.saveDb }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield _super.openDb.call(this);
            for (let i = 0; i < db.surveys.length; i++) {
                if (db.surveys[i].id === Survey.id) {
                    db.surveys[i] = Survey;
                    yield _super.saveDb.call(this, db);
                    return;
                }
            }
            throw new Error('Survey not found');
        });
    }
    delete(id) {
        const _super = Object.create(null, {
            openDb: { get: () => super.openDb },
            saveDb: { get: () => super.saveDb }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield _super.openDb.call(this);
            for (let i = 0; i < db.surveys.length; i++) {
                if (db.surveys[i].id === id) {
                    db.surveys.splice(i, 1);
                    yield _super.saveDb.call(this, db);
                    return;
                }
            }
            throw new Error('Survey not found');
        });
    }
}
exports.default = SurveyDao;
