const IsArray = (value: any) => {
    if (!!value) {
        let _arrayConstructor = [].constructor;
        return value.constructor === _arrayConstructor;
    } else
        return false;
}

const IsObject = (value: any) => {
    if (!!value) {
        let _objectConstructor = {}.constructor;
        return value.constructor === _objectConstructor;
    }
    else
        return false;
}

const GetKeysFromObjectAsSortedAsc = (obj: any) => {
    let _keys = Object.keys(obj || {});
    if (_keys.length > 0) {
        _keys = _keys.sort();
        return _keys;
    }
    else {
        return [];
    }
}

const GetEpouchTime = () => {
    let _date = new Date();
    return _date.getTime();
}

const Sleep=(ms:any)=> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

export default {
    IsArray,
    IsObject,
    GetKeysFromObjectAsSortedAsc,
    GetEpouchTime,
    Sleep
}