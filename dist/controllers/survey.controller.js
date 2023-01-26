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
    let _response = new response_model_1.ResponseModel(`[INFO] [REQUEST] [GET-ALL-SURVEY]`);
    try {
        yield database_1.default.CONNECT();
        _response.result = yield database_1.default.FIND_ALL_SURVEY_WITH_AGENT(utils_1.Utils.CONSTANT.TABLE_NAMES.SURVEY);
    }
    catch (err) {
        _response.error(`[ERROR] [REQUEST] [GET-ALL-SURVEY]`, err);
    }
    res.status(_response.status).send(_response.updateRequestTime());
});
const getDetailsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let _response = new response_model_1.ResponseModel(`[INFO] [REQUEST] [GET-DETAILS-BY-ID-SURVEY]`);
    try {
        yield database_1.default.CONNECT();
        let _id = req.params["id"];
        let surveyDetails = yield database_1.default.FIND_DOCUMENT_WITH_FILTER(utils_1.Utils.CONSTANT.TABLE_NAMES.SURVEY_INFO, {
            surveyId: _id,
        });
        let _userDetails = yield database_1.default.FIND_DOCUMENT_WITH_FILTER(utils_1.Utils.CONSTANT.TABLE_NAMES.SURVEY, {
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
            }, surveyDetails
        };
        if (!!!_response.result)
            _response.notFound();
    }
    catch (err) {
        _response.error(`[ERROR] [REQUEST] [GET-DETAILS-BY-ID-SURVEY]`, err);
    }
    res.status(_response.status).send(_response.updateRequestTime());
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let _response = new response_model_1.ResponseModel(`[INFO] [REQUEST] [CREATE-SURVEY]`);
    try {
        if (Object.keys(req.body).length > 0) {
            yield database_1.default.CONNECT();
            let _count = yield database_1.default.COUNT(utils_1.Utils.CONSTANT.TABLE_NAMES.SURVEY);
            let survey_code = utils_1.Utils.CONSTANT.PREFIX.SURVEY;
            if (_count == 0) {
                survey_code += '1'.padStart(10, '0');
            }
            else {
                let _lastSurvey = yield database_1.default.FIND_DOCUMENT_WITH_LIMIT(utils_1.Utils.CONSTANT.TABLE_NAMES.SURVEY, 1, { created_on: -1 });
                survey_code += (parseInt(_lastSurvey[0].code.split(survey_code)[1]) + 1).toString().padStart(10, '0');
            }
            let _userId = req.body['userId'];
            let resp = yield database_1.default.INSERT_ONE(utils_1.Utils.CONSTANT.TABLE_NAMES.SURVEY, Object.assign(Object.assign({}, req.body['userDetails']), { code: survey_code, userId: _userId, createdOn: new Date() }));
            for (let iCount = 0; iCount < req.body['surveyDetails'].length; iCount++) {
                let _questionId = req.body['surveyDetails'][iCount]._id;
                delete req.body['surveyDetails'][iCount]._id;
                yield database_1.default.INSERT_ONE(utils_1.Utils.CONSTANT.TABLE_NAMES.SURVEY_INFO, Object.assign(Object.assign({}, req.body['surveyDetails'][iCount]), { surveyId: resp.insertedId.toString(), questiondId: _questionId, created_on: new Date() }));
            }
        }
    }
    catch (err) {
        _response.error(`[ERROR] [REQUEST] [CREATE-SURVEY]`, err);
    }
    res.status(_response.status).send(_response.updateRequestTime());
});
// const update = async (req: Request, res: Response) => {
//     let _response = new ResponseModel(`[INFO] [REQUEST] [UPDATE-SURVEY]`);
//     try {
//         let _id = req.params["id"];
//         if (Object.keys(req.body).length > 0 && !!_id) {
//             await db.CONNECT();
//             _response.result = await db.UPDATE_ONE(
//                 Utils.CONSTANT.TABLE_NAMES.QUESTION,
//                 {
//                     _id: new ObjectId(_id),
//                 },
//                 { ...req.body, updated_on: new Date() }
//             );
//         }
//     } catch (err: any) {
//         _response.error(`[ERROR] [REQUEST] [UPDATE-SURVEY]`, err);
//     }
//     res.status(_response.status).send(_response.updateRequestTime());
// };
// const _delete = async (req: Request, res: Response) => {
//     let _response = new ResponseModel(`[INFO] [REQUEST] [DELETE-QUESTION]`);
//     try {
//         let _id = req.params["id"];
//         if (!!_id) {
//             await db.CONNECT();
//             _response.result = await db.REMOVE(
//                 Utils.CONSTANT.TABLE_NAMES.QUESTION,
//                 {
//                     _id: new ObjectId(_id),
//                 },
//             );
//         }
//     } catch (err: any) {
//         _response.error(`[ERROR] [REQUEST] [DELETE-QUESTION]`, err);
//     }
//     res.status(_response.status).send(_response.updateRequestTime());
// };
exports.default = {
    create,
    getAll,
    getDetailsById,
    // update,
    // delete: _delete
};
//# sourceMappingURL=survey.controller.js.map