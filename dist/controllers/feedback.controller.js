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
    let _response = new response_model_1.ResponseModel(`[INFO] [REQUEST] [GET-ALL-FEEDBACK]`);
    try {
        yield database_1.default.CONNECT();
        _response.result = yield database_1.default.FIND_ALL_SURVEY_WITH_AGENT(utils_1.Utils.CONSTANT.TABLE_NAMES.FEEDBACK);
    }
    catch (err) {
        _response.error(`[ERROR] [REQUEST] [GET-ALL-FEEDBACK]`, err);
    }
    res.status(_response.status).send(_response.updateRequestTime());
});
const getDetailsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let _response = new response_model_1.ResponseModel(`[INFO] [REQUEST] [GET-DETAILS-BY-ID-FEEDBACK]`);
    try {
        yield database_1.default.CONNECT();
        let _id = req.params["id"];
        let feedbackDetails = yield database_1.default.FIND_DOCUMENT_WITH_FILTER(utils_1.Utils.CONSTANT.TABLE_NAMES.FEEDBACK_INFO, {
            feedbackId: _id,
        });
        let _userDetails = yield database_1.default.FIND_DOCUMENT_WITH_FILTER(utils_1.Utils.CONSTANT.TABLE_NAMES.FEEDBACK, {
            _id: new mongodb_1.ObjectId(_id),
        });
        let { firstName, lastName, address, city, state, userEmail, code, userId } = _userDetails[0];
        _response.result = {
            _id, userId, userDetails: {
                firstName,
                lastName,
                address,
                city,
                state,
                userEmail,
                code,
            }, feedbackDetails
        };
        if (!!!_response.result)
            _response.notFound();
    }
    catch (err) {
        _response.error(`[ERROR] [REQUEST] [GET-DETAILS-BY-ID-FEEDBACK]`, err);
    }
    res.status(_response.status).send(_response.updateRequestTime());
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let _response = new response_model_1.ResponseModel(`[INFO] [REQUEST] [CREATE-FEEDBACK]`);
    try {
        if (Object.keys(req.body).length > 0) {
            yield database_1.default.CONNECT();
            let _count = yield database_1.default.COUNT(utils_1.Utils.CONSTANT.TABLE_NAMES.FEEDBACK);
            let feedback_code = utils_1.Utils.CONSTANT.PREFIX.FEEDBACK;
            if (_count == 0) {
                feedback_code += '1'.padStart(10, '0');
            }
            else {
                let _lastFeedback = yield database_1.default.FIND_DOCUMENT_WITH_LIMIT(utils_1.Utils.CONSTANT.TABLE_NAMES.FEEDBACK, 1, { created_on: -1 });
                feedback_code += (parseInt(_lastFeedback[0].code.split(feedback_code)[1]) + 1).toString().padStart(10, '0');
            }
            let _userId = req.body['userId'];
            let resp = yield database_1.default.INSERT_ONE(utils_1.Utils.CONSTANT.TABLE_NAMES.FEEDBACK, Object.assign(Object.assign({}, req.body['userDetails']), { code: feedback_code, userId: _userId, createdOn: new Date() }));
            for (let iCount = 0; iCount < req.body['feedbackDetails'].length; iCount++) {
                let _questionId = req.body['feedbackDetails'][iCount]._id;
                delete req.body['feedbackDetails'][iCount]._id;
                yield database_1.default.INSERT_ONE(utils_1.Utils.CONSTANT.TABLE_NAMES.FEEDBACK_INFO, Object.assign(Object.assign({}, req.body['feedbackDetails'][iCount]), { feedbackId: resp.insertedId.toString(), questiondId: _questionId, created_on: new Date() }));
            }
        }
    }
    catch (err) {
        _response.error(`[ERROR] [REQUEST] [CREATE-FEEDBACK]`, err);
    }
    res.status(_response.status).send(_response.updateRequestTime());
});
exports.default = {
    create,
    getAll,
    getDetailsById,
};
//# sourceMappingURL=feedback.controller.js.map