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
const response_model_1 = require("../models/response.model");
const database_1 = __importDefault(require("../config/database"));
const utils_1 = require("../utils");
const mongodb_1 = require("mongodb");
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let _response = new response_model_1.ResponseModel(`[INFO] [REQUEST] [GET-ALL-AGENT]`);
    try {
        yield database_1.default.CONNECT();
        _response.result = yield database_1.default.FIND_ALL_AGENT_WITH_TABLET(utils_1.Utils.CONSTANT.TABLE_NAMES.AGENT);
    }
    catch (err) {
        _response.error(`[ERROR] [REQUEST] [GET-ALL-AGENT]`, err);
    }
    res.status(_response.status).send(_response.updateRequestTime());
});
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let _response = new response_model_1.ResponseModel(`[INFO] [REQUEST] [GET-BY-ID-AGENT]`);
    try {
        yield database_1.default.CONNECT();
        let _id = req.params["id"];
        _response.result = yield database_1.default.FIND_DOCUMENT_WITH_FILTER(utils_1.Utils.CONSTANT.TABLE_NAMES.AGENT, {
            _id: new mongodb_1.ObjectId(_id),
        });
        if (!!!_response.result)
            _response.notFound();
    }
    catch (err) {
        _response.error(`[ERROR] [REQUEST] [GET-BY-ID-AGENT]`, err);
    }
    res.status(_response.status).send(_response.updateRequestTime());
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let _response = new response_model_1.ResponseModel(`[INFO] [REQUEST] [CREATE-AGENT]`);
    try {
        if (Object.keys(req.body).length > 0) {
            yield database_1.default.CONNECT();
            delete req.body._id;
            _response.result = yield database_1.default.INSERT_ONE(utils_1.Utils.CONSTANT.TABLE_NAMES.AGENT, Object.assign(Object.assign({}, req.body), { created_on: new Date() }));
        }
    }
    catch (err) {
        _response.error(`[ERROR] [REQUEST] [CREATE-AGENT]`, err);
    }
    res.status(_response.status).send(_response.updateRequestTime());
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let _response = new response_model_1.ResponseModel(`[INFO] [REQUEST] [UPDATE-AGENT]`);
    try {
        let _id = req.params["id"];
        if (Object.keys(req.body).length > 0 && !!_id) {
            yield database_1.default.CONNECT();
            _response.result = yield database_1.default.UPDATE_ONE(utils_1.Utils.CONSTANT.TABLE_NAMES.AGENT, {
                _id: new mongodb_1.ObjectId(_id),
            }, Object.assign(Object.assign({}, req.body), { updated_on: new Date() }));
        }
    }
    catch (err) {
        _response.error(`[ERROR] [REQUEST] [UPDATE-AGENT]`, err);
    }
    res.status(_response.status).send(_response.updateRequestTime());
});
const _delete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let _response = new response_model_1.ResponseModel(`[INFO] [REQUEST] [DELETE-AGENT]`);
    try {
        let _id = req.params["id"];
        if (!!_id) {
            yield database_1.default.CONNECT();
            _response.result = yield database_1.default.REMOVE(utils_1.Utils.CONSTANT.TABLE_NAMES.AGENT, {
                _id: new mongodb_1.ObjectId(_id),
            });
        }
    }
    catch (err) {
        _response.error(`[ERROR] [REQUEST] [DELETE-AGENT]`, err);
    }
    res.status(_response.status).send(_response.updateRequestTime());
});
exports.default = {
    create,
    getAll,
    getById,
    update,
    delete: _delete
};
//# sourceMappingURL=agent.controller.js.map