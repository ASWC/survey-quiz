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
class ResponseDao extends MockDao_mock_1.default {
    getOne(id) {
        const _super = Object.create(null, {
            openDb: { get: () => super.openDb }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield _super.openDb.call(this);
            for (const response of db.responses) {
                if (response.id === id) {
                    return response;
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
            return db.responses;
        });
    }
    add(Response) {
        const _super = Object.create(null, {
            openDb: { get: () => super.openDb },
            saveDb: { get: () => super.saveDb }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield _super.openDb.call(this);
            Response.id = functions_1.getRandomInt();
            Response.completed || (Response.completed = new Date());
            db.responses.push(Response);
            yield _super.saveDb.call(this, db);
        });
    }
    update(Response) {
        const _super = Object.create(null, {
            openDb: { get: () => super.openDb },
            saveDb: { get: () => super.saveDb }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield _super.openDb.call(this);
            for (let i = 0; i < db.responses.length; i++) {
                if (db.responses[i].id === Response.id) {
                    db.responses[i] = Response;
                    yield _super.saveDb.call(this, db);
                    return;
                }
            }
            throw new Error('Response not found');
        });
    }
    delete(id) {
        const _super = Object.create(null, {
            openDb: { get: () => super.openDb },
            saveDb: { get: () => super.saveDb }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield _super.openDb.call(this);
            for (let i = 0; i < db.responses.length; i++) {
                if (db.responses[i].id === id) {
                    db.responses.splice(i, 1);
                    yield _super.saveDb.call(this, db);
                    return;
                }
            }
            throw new Error('Response not found');
        });
    }
}
exports.default = ResponseDao;
