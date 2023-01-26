import axios from "axios";
import { Utils } from "../utils";

const getHeaders = () => {
  return {
    "Content-Type": "application/json",
  };
};

const getData = async () => {
  Utils.LOGGER.info(`[INFO] [GET-DATA-API]`);
  let _resp = undefined;
  try {
    const res = await axios.post(
      Utils.CONSTANT.EXTERNAL_API.DEMO,
      {},
      { headers: getHeaders() }
    );
    _resp = res.data.result;
    return _resp;
  } catch (err: any) {
    Utils.LOGGER.error(
      `[ERROR] [GET-DATA-API] [${JSON.stringify(err.message)}]`
    );
    return -1;
  }
};


export default {
  GET_DATA: getData
};
