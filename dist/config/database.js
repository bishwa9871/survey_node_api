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
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const utils_1 = require("../utils");
const url = "mongodb+srv://survey_db:VYrA8dhR2Y2gfz05@survey-app.swv44jo.mongodb.net/?retryWrites=true&w=majority";
const client = new mongodb_1.MongoClient(url);
let _database;
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!!!_database) {
            yield client.connect();
            utils_1.Utils.LOGGER.info(`[INFO] [DATABASE] [CONNECTED-SUCCESSFULLY]`);
            _database = client.db(utils_1.Utils.CONSTANT.DATABASE.NAME);
        }
    }
    catch (err) {
        utils_1.Utils.LOGGER.error(`[ERROR] [CONNECTION-OPEN] : [${JSON.stringify(err.message)}]`);
        throw new Error('Error in DB Connection');
    }
});
const countDocument = (collectionName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let _collection = _database.collection(collectionName);
        return yield _collection.count();
    }
    catch (err) {
        utils_1.Utils.LOGGER.error(`[ERROR] [COUNT-DOCUMENT] [${collectionName}]  : [${JSON.stringify(err.message)}]`);
    }
});
const findAllDocument = (collectionName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let _collection = _database.collection(collectionName);
        return yield _collection.find({}).sort({ created_on: -1 }).toArray();
    }
    catch (err) {
        utils_1.Utils.LOGGER.error(`[ERROR] [FIND-ALL-DOCUMENT] [${collectionName}]  : [${JSON.stringify(err.message)}]`);
    }
});
const findAllProductWithTablet = (collectionName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let _collection = _database.collection(collectionName);
        return yield _collection.aggregate([
            { "$addFields": { "_product_id": { "$toString": "$_id" } } },
            {
                $lookup: {
                    "from": 'product_tablet_mapping',
                    "localField": "_product_id",
                    "foreignField": "product_id",
                    "as": "product_tablets"
                }
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$product_tablets", 0] }, "$$ROOT"] } }
            },
            // { $project: { tablets:1,product_id:0,_product_id:0} },
        ]).sort({ created_on: -1 }).toArray();
    }
    catch (err) {
        utils_1.Utils.LOGGER.error(`[ERROR] [FIND-ALL-PRODUCT-WITH-TABLET] [${collectionName} & product_tablet_mpping ] : [${JSON.stringify(err.message)}]`);
    }
});
const findAllAgentWithTablet = (collectionName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let _collection = _database.collection(collectionName);
        return yield _collection.aggregate([
            { "$addFields": { "tablet_id": { "$toObjectId": "$tablet" } } },
            {
                $lookup: {
                    "from": 'tablets',
                    "localField": "tablet_id",
                    "foreignField": "_id",
                    "as": "tablet_info"
                }
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$tablet_info", 0] }, "$$ROOT"] } }
            },
            // { $project: { tablets:1,product_id:0,_product_id:0} },
        ]).sort({ created_on: -1 }).toArray();
    }
    catch (err) {
        utils_1.Utils.LOGGER.error(`[ERROR] [FIND-ALL-AGENT-WITH-TABLET] [${collectionName} & tablets ] : [${JSON.stringify(err.message)}]`);
    }
});
const findAllSurveyWithAgent = (collectionName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let _collection = _database.collection(collectionName);
        return yield _collection.aggregate([
            { "$addFields": { "user_id": { "$toObjectId": "$userId" } } },
            {
                $lookup: {
                    "from": 'users',
                    "localField": "user_id",
                    "foreignField": "_id",
                    "as": "users_info"
                }
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$users_info", 0] }, "$$ROOT"] } }
            },
        ]).sort({ created_on: -1 }).toArray();
    }
    catch (err) {
        utils_1.Utils.LOGGER.error(`[ERROR] [FIND-ALL-SURVEY-WITH-AGENT] [agent & ${collectionName}] : [${JSON.stringify(err.message)}]`);
    }
});
const findAllMQQuestions = (collectionName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let _collection = _database.collection(collectionName);
        return yield _collection.aggregate([
            { "$addFields": { "answer_id": { "$toObjectId": "$answerId" } } },
            {
                $lookup: {
                    "from": `${utils_1.Utils.CONSTANT.TABLE_NAMES.ANSWER_SET}`,
                    "localField": "answer_id",
                    "foreignField": "_id",
                    "as": "answer_info"
                }
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$answer_info", 0] }, "$$ROOT"] } }
            },
        ]).sort({ created_on: -1 }).toArray();
    }
    catch (err) {
        utils_1.Utils.LOGGER.error(`[ERROR] [FIND-ALL-SURVEY-WITH-AGENT] [agent & ${collectionName}] : [${JSON.stringify(err.message)}]`);
    }
});
const findDocumentWithLimit = (collectionName, limit, sortFilter) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let _collection = _database.collection(collectionName);
        if (!!!sortFilter)
            return yield _collection.find({}).limit(limit).toArray();
        else
            return yield _collection.find({}).sort(sortFilter).limit(limit).toArray();
    }
    catch (err) {
        utils_1.Utils.LOGGER.error(`[ERROR] [FIND-DOCUMENT-WITH-LIMIT] [${collectionName}]  : [${JSON.stringify(err.message)}]`);
    }
});
const findDocumentWithFilter = (collectionName, filter) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let _collection = yield _database.collection(collectionName);
        return yield _collection.find(filter).toArray();
    }
    catch (err) {
        utils_1.Utils.LOGGER.error(`[ERROR] [FIND-ALL-DOCUMENT-WITH-FILTER] [${collectionName}]  : [${JSON.stringify(err.message)}]`);
    }
});
const insert_one = (collectionName, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let _collection = yield _database.collection(collectionName);
        return yield _collection.insertOne(data);
    }
    catch (err) {
        utils_1.Utils.LOGGER.error(`[ERROR] [INSERT-ONE] [${collectionName}]  : [${JSON.stringify(err.message)}]`);
    }
});
const update_one = (collectionName, filter, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let _collection = _database.collection(collectionName);
        return yield _collection.updateOne(filter, { $set: data });
    }
    catch (err) {
        utils_1.Utils.LOGGER.error(`[ERROR] [UPDATE-ONE] [${collectionName}]  : [${JSON.stringify(err.message)}]`);
    }
});
const update_with_upsert = (collectionName, filter, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let _collection = _database.collection(collectionName);
        return yield _collection.update(filter, { $set: data }, { upsert: true });
    }
    catch (err) {
        utils_1.Utils.LOGGER.error(`[ERROR] [UPDATE-WITH-UPSERT] [${collectionName}]  : [${JSON.stringify(err.message)}]`);
    }
});
const remove = (collectionName, filter) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let _collection = _database.collection(collectionName);
        return yield _collection.remove(filter);
    }
    catch (err) {
        utils_1.Utils.LOGGER.error(`[ERROR] [REMOVE] [${collectionName}]  : [${JSON.stringify(err.message)}]`);
    }
});
function close() {
    try {
        if (!!client) {
            client.close();
            _database = undefined;
        }
    }
    catch (err) {
        utils_1.Utils.LOGGER.error(`[ERROR] [CONNECTION-CLOSE] : [${JSON.stringify(err.message)}]`);
    }
}
exports.default = {
    CONNECT: connect,
    COUNT: countDocument,
    CLOSE_CONNECTION: close,
    FIND_ALL_DOCUMENT: findAllDocument,
    FIND_DOCUMENT_WITH_LIMIT: findDocumentWithLimit,
    FIND_DOCUMENT_WITH_FILTER: findDocumentWithFilter,
    FIND_ALL_PRODUCT_WITH_TABLET: findAllProductWithTablet,
    FIND_ALL_AGENT_WITH_TABLET: findAllAgentWithTablet,
    FIND_ALL_SURVEY_WITH_AGENT: findAllSurveyWithAgent,
    INSERT_ONE: insert_one,
    REMOVE: remove,
    UPDATE_ONE: update_one,
    UPDATE_WITH_UPSERT: update_with_upsert
};
//# sourceMappingURL=database.js.map