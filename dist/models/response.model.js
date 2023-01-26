"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseModel = void 0;
const utils_1 = require("../utils");
class ResponseModel {
    constructor(_log, _message, _result, _status) {
        this._utils = utils_1.Utils;
        // this._utils.LOGGER.info(_log);
        this.message = this._utils.CONSTANT.COMMON.SUCCESS;
        this.status = 200;
        this.request_time_in_millisecond = this._utils.FUNCTION.GetEpouchTime();
    }
    error(_module, _err) {
        // this._utils.LOGGER.error(`${_module} : [${JSON.stringify(_err.message)}]`);
        if (_err.message.indexOf('failed to send transaction:') > -1) {
            this.message = _err.message;
        }
        else if (_err.message.indexOf('503 Service Unavailable') > -1) {
            this.message = _err.message;
        }
        else {
            this.message = this._utils.CONSTANT.COMMON.INTERNAL_SERVER_ERROR;
        }
        this.status = 500;
    }
    notFound() {
        this.message = this._utils.CONSTANT.COMMON.NOT_FOUND;
        this.status = 404;
    }
    updateRequestTime() {
        this.request_time_in_millisecond = this._utils.FUNCTION.GetEpouchTime() - this.request_time_in_millisecond;
        return this;
    }
}
exports.ResponseModel = ResponseModel;
;
//# sourceMappingURL=response.model.js.map