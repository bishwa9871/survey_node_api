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
const axios_1 = __importDefault(require("axios"));
const utils_1 = require("../utils");
const getHeaders = () => {
    return {
        "Content-Type": "application/json",
    };
};
const getData = () => __awaiter(void 0, void 0, void 0, function* () {
    utils_1.Utils.LOGGER.info(`[INFO] [GET-DATA-API]`);
    let _resp = undefined;
    try {
        const res = yield axios_1.default.post(utils_1.Utils.CONSTANT.EXTERNAL_API.DEMO, {}, { headers: getHeaders() });
        _resp = res.data.result;
        return _resp;
    }
    catch (err) {
        utils_1.Utils.LOGGER.error(`[ERROR] [GET-DATA-API] [${JSON.stringify(err.message)}]`);
        return -1;
    }
});
exports.default = {
    GET_DATA: getData
};
//# sourceMappingURL=index.js.map