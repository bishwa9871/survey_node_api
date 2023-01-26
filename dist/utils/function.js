"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IsArray = (value) => {
    if (!!value) {
        let _arrayConstructor = [].constructor;
        return value.constructor === _arrayConstructor;
    }
    else
        return false;
};
const IsObject = (value) => {
    if (!!value) {
        let _objectConstructor = {}.constructor;
        return value.constructor === _objectConstructor;
    }
    else
        return false;
};
const GetKeysFromObjectAsSortedAsc = (obj) => {
    let _keys = Object.keys(obj || {});
    if (_keys.length > 0) {
        _keys = _keys.sort();
        return _keys;
    }
    else {
        return [];
    }
};
const GetEpouchTime = () => {
    let _date = new Date();
    return _date.getTime();
};
const Sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};
exports.default = {
    IsArray,
    IsObject,
    GetKeysFromObjectAsSortedAsc,
    GetEpouchTime,
    Sleep
};
//# sourceMappingURL=function.js.map