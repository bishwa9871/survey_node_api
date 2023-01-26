import { Request, Response } from "express";
import { ResponseModel } from "../models/response.model";
import db from "../config/database";
import { Utils } from "../utils";


const login = async (req: Request, res: Response) => {  
  let _response = new ResponseModel(`[INFO] [REQUEST] [GET-LOGIN-INFO]`);
  try {
    await db.CONNECT();    
    let _userName = req.query["username"];
    let _password = req.query["password"];
    _response.result = await db.FIND_DOCUMENT_WITH_FILTER(
      Utils.CONSTANT.TABLE_NAMES.USER,
      {
        username: _userName,
        password: _password,
      }
    );

    if (!!!_response.result) _response.notFound();
  } catch (err: any) {
    _response.error(`[ERROR] [REQUEST] [GET-LOGIN-INFO]`, err);
  }
  res.status(_response.status).send(_response.updateRequestTime());
};

export default {
  login
};
