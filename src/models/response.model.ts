import { Utils } from "../utils";

export class ResponseModel {
    result: any;
    message: string;
    status: number;
    request_time_in_millisecond: number;

    private _utils = Utils;

    constructor(_log?: string, _message?: string, _result?: string, _status?: string) {
        this._utils.LOGGER.info(_log);
        this.message = this._utils.CONSTANT.COMMON.SUCCESS;
        this.status = 200;
        this.request_time_in_millisecond = this._utils.FUNCTION.GetEpouchTime();
    }

    error(_module: string, _err: any) {
        this._utils.LOGGER.error(`${_module} : [${JSON.stringify(_err.message)}]`);
        if(_err.message.indexOf('failed to send transaction:') > -1){
            this.message = _err.message;
        }
        else if(_err.message.indexOf('503 Service Unavailable') > -1){
            this.message=_err.message;
        }else{
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
};
