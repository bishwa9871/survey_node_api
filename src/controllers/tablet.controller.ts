import { Request, Response } from "express";
import { ResponseModel } from "../models/response.model";
import db from "../config/database";
import { Utils } from "../utils";
import { ObjectId } from "mongodb";


const getAll = async (req: Request, res: Response) => {
    let _response = new ResponseModel(`[INFO] [REQUEST] [GET-ALL-TABLET]`);
    try {
        await db.CONNECT();
        _response.result = await db.FIND_ALL_DOCUMENT(
            Utils.CONSTANT.TABLE_NAMES.TABLET
        );
    } catch (err: any) {
        _response.error(`[ERROR] [REQUEST] [GET-ALL-TABLET]`, err);
    }
    res.status(_response.status).send(_response.updateRequestTime());
};

const getById = async (req: Request, res: Response) => {
    let _response = new ResponseModel(`[INFO] [REQUEST] [GET-BY-ID-TABLET]`);
    try {
        await db.CONNECT();
        let _id = req.params["id"];
        _response.result = await db.FIND_DOCUMENT_WITH_FILTER(
            Utils.CONSTANT.TABLE_NAMES.TABLET,
            {
                _id: new ObjectId(_id),
            }
        );

        if (!!!_response.result) _response.notFound();
    } catch (err: any) {
        _response.error(`[ERROR] [REQUEST] [GET-BY-ID-TABLET]`, err);
    }
    res.status(_response.status).send(_response.updateRequestTime());
};


const create = async (req: Request, res: Response) => {
    let _response = new ResponseModel(`[INFO] [REQUEST] [CREATE-TABLET]`);
    try {
        if (Object.keys(req.body).length > 0) {
            await db.CONNECT();
            let _count = await db.COUNT(Utils.CONSTANT.TABLE_NAMES.TABLET);
            let tablet_code: string = Utils.CONSTANT.PREFIX.TABLET;
            if (_count == 0) {
                tablet_code += '1'.padStart(3, '0');
            }
            else {
                let _lastProd = await db.FIND_DOCUMENT_WITH_LIMIT(Utils.CONSTANT.TABLE_NAMES.TABLET, 1, { created_on: -1 });
                tablet_code += (parseInt(_lastProd[0].code.split(tablet_code)[1]) + 1).toString().padStart(3, '0');
            }
            
            delete req.body._id;

            _response.result = await db.INSERT_ONE(
                Utils.CONSTANT.TABLE_NAMES.TABLET,
                {
                    ...req.body, code: tablet_code, created_on: new Date()
                }
            );
        }
    } catch (err: any) {
        _response.error(`[ERROR] [REQUEST] [CREATE-TABLET]`, err);
    }
    res.status(_response.status).send(_response.updateRequestTime());
};

const update = async (req: Request, res: Response) => {
    let _response = new ResponseModel(`[INFO] [REQUEST] [UPDATE-TABLET]`);
    try {
        let _id = req.params["id"];
        if (Object.keys(req.body).length > 0 && !!_id) {
            await db.CONNECT();
            _response.result = await db.UPDATE_ONE(
                Utils.CONSTANT.TABLE_NAMES.TABLET,
                {
                    _id: new ObjectId(_id),
                },
                { ...req.body, updated_on: new Date() }
            );
        }
    } catch (err: any) {
        _response.error(`[ERROR] [REQUEST] [UPDATE-TABLET]`, err);
    }
    res.status(_response.status).send(_response.updateRequestTime());
};


const _delete = async (req: Request, res: Response) => {
    let _response = new ResponseModel(`[INFO] [REQUEST] [DELETE-TABLET]`);
    try {
        let _id = req.params["id"];
        if (!!_id) {
            await db.CONNECT();
            _response.result = await db.REMOVE(
                Utils.CONSTANT.TABLE_NAMES.TABLET,
                {
                    _id: new ObjectId(_id),
                },
               );
        }
    } catch (err: any) {
        _response.error(`[ERROR] [REQUEST] [DELETE-TABLET]`, err);
    }
    res.status(_response.status).send(_response.updateRequestTime());
};



export default {
    create,
    getAll,
    getById,
    update,
    delete:_delete
};
