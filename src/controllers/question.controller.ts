import { Request, Response } from "express";
import { ResponseModel } from "../models/response.model";
import db from "../config/database";
import { Utils } from "../utils";
import { ObjectId } from "mongodb";


const getAll = async (req: Request, res: Response) => {
    let _response = new ResponseModel(`[INFO] [REQUEST] [GET-ALL-QUESTION]`);
    try {
        await db.CONNECT();
        _response.result = await db.FIND_ALL_DOCUMENT(
            Utils.CONSTANT.TABLE_NAMES.QUESTION
        );
    } catch (err: any) {
        _response.error(`[ERROR] [REQUEST] [GET-ALL-QUESTION]`, err);
    }
    res.status(_response.status).send(_response.updateRequestTime());
};

const getById = async (req: Request, res: Response) => {
    let _response = new ResponseModel(`[INFO] [REQUEST] [GET-BY-ID-QUESTION]`);
    try {
        await db.CONNECT();
        let _id = req.params["id"];
        _response.result = await db.FIND_DOCUMENT_WITH_FILTER(
            Utils.CONSTANT.TABLE_NAMES.QUESTION,
            {
                _id: new ObjectId(_id),
            }
        );

        if (!!!_response.result) _response.notFound();
    } catch (err: any) {
        _response.error(`[ERROR] [REQUEST] [GET-BY-ID-QUESTION]`, err);
    }
    res.status(_response.status).send(_response.updateRequestTime());
};


const create = async (req: Request, res: Response) => {
    let _response = new ResponseModel(`[INFO] [REQUEST] [CREATE-QUESTION]`);
    try {
        if (Object.keys(req.body).length > 0) {
            await db.CONNECT();

            for (let iCount = 0; iCount < req.body.length; iCount++) {
                delete req.body[iCount]._id;
                await db.INSERT_ONE(
                    Utils.CONSTANT.TABLE_NAMES.QUESTION,
                    {
                        ...req.body[iCount], created_on: new Date()
                    }
                );
            }
        }
    } catch (err: any) {
        _response.error(`[ERROR] [REQUEST] [CREATE-QUESTION]`, err);
    }
    res.status(_response.status).send(_response.updateRequestTime());
};

const update = async (req: Request, res: Response) => {
    let _response = new ResponseModel(`[INFO] [REQUEST] [UPDATE-QUESTION]`);
    try {
        let _id = req.params["id"];
        if (Object.keys(req.body).length > 0 && !!_id) {
            await db.CONNECT();
            _response.result = await db.UPDATE_ONE(
                Utils.CONSTANT.TABLE_NAMES.QUESTION,
                {
                    _id: new ObjectId(_id),
                },
                { ...req.body, updated_on: new Date() }
            );
        }
    } catch (err: any) {
        _response.error(`[ERROR] [REQUEST] [UPDATE-QUESTION]`, err);
    }
    res.status(_response.status).send(_response.updateRequestTime());
};


const _delete = async (req: Request, res: Response) => {
    let _response = new ResponseModel(`[INFO] [REQUEST] [DELETE-QUESTION]`);
    try {
        let _id = req.params["id"];
        if (!!_id) {
            await db.CONNECT();
            _response.result = await db.REMOVE(
                Utils.CONSTANT.TABLE_NAMES.QUESTION,
                {
                    _id: new ObjectId(_id),
                },
            );
        }
    } catch (err: any) {
        _response.error(`[ERROR] [REQUEST] [DELETE-QUESTION]`, err);
    }
    res.status(_response.status).send(_response.updateRequestTime());
};



export default {
    create,
    getAll,
    getById,
    update,
    delete: _delete
};
