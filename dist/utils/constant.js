"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _database;
(function (_database) {
    _database["NAME"] = "survey_db";
})(_database || (_database = {}));
var _common;
(function (_common) {
    _common["API_RUNNING_SUCCESSFULLY"] = "API is running successfully";
    _common["DATABASE_CONNECTED_SUCCESSFULLY"] = "Database is connected successfully";
    _common["FILE_UPLOADED_SUCCESSFULLY"] = "File Uploaded Successfully";
    _common["INTERNAL_SERVER_ERROR"] = "Internal Server Error";
    _common["NOT_FOUND"] = "Not Found";
    _common["SUCCESS"] = "Success";
})(_common || (_common = {}));
var _prefix;
(function (_prefix) {
    _prefix["TABLET"] = "T";
    _prefix["PRODUCT"] = "M4S";
    _prefix["SURVEY"] = "SURVEY";
    _prefix["FEEDBACK"] = "FB";
    _prefix["MQ_QUESTION"] = "MQ";
})(_prefix || (_prefix = {}));
var _externalAPI;
(function (_externalAPI) {
    _externalAPI["DEMO"] = "default";
})(_externalAPI || (_externalAPI = {}));
var _environment;
(function (_environment) {
    _environment["DEV_NET"] = "devnet";
})(_environment || (_environment = {}));
var _tableNames;
(function (_tableNames) {
    _tableNames["AGENT"] = "agents";
    _tableNames["AGENT_TABLET_MAPPING"] = "agent_tablet_mapping";
    _tableNames["ANSWER_SET"] = "answer_sets";
    _tableNames["FEEDBACK"] = "feedbacks";
    _tableNames["FEEDBACK_INFO"] = "feedback_info";
    _tableNames["MQ_QUESTION"] = "mq_questions";
    _tableNames["PRODUCT"] = "products";
    _tableNames["PRODUCT_TABLET_MAPPING"] = "product_tablet_mapping";
    _tableNames["QUESTION"] = "questions";
    _tableNames["SURVEY"] = "surveys";
    _tableNames["SURVEY_INFO"] = "survey_info";
    _tableNames["TABLET"] = "tablets";
    _tableNames["USER"] = "users";
})(_tableNames || (_tableNames = {}));
exports.default = {
    COMMON: _common,
    CONNECTION_ENVIRONMENT: _environment,
    DATABASE: _database,
    EXTERNAL_API: _externalAPI,
    PREFIX: _prefix,
    TABLE_NAMES: _tableNames,
};
//# sourceMappingURL=constant.js.map