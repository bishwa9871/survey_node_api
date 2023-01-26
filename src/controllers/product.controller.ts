import { Request, Response } from "express";
import { ResponseModel } from "../models/response.model";
import db from "../config/database";
import { Utils } from "../utils";
import { ObjectId } from "mongodb";


const getAll = async (req: Request, res: Response) => {
    let _response = new ResponseModel(`[INFO] [REQUEST] [GET-ALL-PRODUCT]`);
    try {
        await db.CONNECT();
        _response.result = await db.FIND_ALL_PRODUCT_WITH_TABLET(
            Utils.CONSTANT.TABLE_NAMES.PRODUCT
        );
    } catch (err: any) {
        _response.error(`[ERROR] [REQUEST] [GET-ALL-PRODUCT]`, err);
    }
    res.status(_response.status).send(_response.updateRequestTime());
};

const getById = async (req: Request, res: Response) => {
    let _response = new ResponseModel(`[INFO] [REQUEST] [GET-BY-ID-PRODUCT]`);
    try {
        await db.CONNECT();
        let _id = req.params["id"];
        _response.result = await db.FIND_DOCUMENT_WITH_FILTER(
            Utils.CONSTANT.TABLE_NAMES.PRODUCT,
            {
                _id: new ObjectId(_id),
            }
        );

        if (!!!_response.result) _response.notFound();
    } catch (err: any) {
        _response.error(`[ERROR] [REQUEST] [GET-BY-ID-PRODUCT]`, err);
    }
    res.status(_response.status).send(_response.updateRequestTime());
};


const create = async (req: Request, res: Response) => {
    let _response = new ResponseModel(`[INFO] [REQUEST] [CREATE-PRODUCT]`);
    try {
        if (Object.keys(req.body).length > 0) {
            await db.CONNECT();
            let _count = await db.COUNT(Utils.CONSTANT.TABLE_NAMES.PRODUCT);
            let product_code: string = Utils.CONSTANT.PREFIX.PRODUCT;
            if (_count == 0) {
                product_code += '1'.padStart(4, '0');
            }
            else {
                let _lastProd = await db.FIND_DOCUMENT_WITH_LIMIT(Utils.CONSTANT.TABLE_NAMES.PRODUCT, 1, { created_on: -1 });
                product_code += (parseInt(_lastProd[0].code.split(product_code)[1]) + 1).toString().padStart(4, '0');
            }

            delete req.body._id;
            _response.result = await db.INSERT_ONE(
                Utils.CONSTANT.TABLE_NAMES.PRODUCT,
                {
                    ...req.body, code: product_code, created_on: new Date()
                }
            );
        }
    } catch (err: any) {
        _response.error(`[ERROR] [REQUEST] [CREATE-PRODUCT]`, err);
    }
    res.status(_response.status).send(_response.updateRequestTime());
};

const update = async (req: Request, res: Response) => {
    let _response = new ResponseModel(`[INFO] [REQUEST] [UPDATE-PRODUCT]`);
    try {
        let _id = req.params["id"];
        if (Object.keys(req.body).length > 0 && !!_id) {
            await db.CONNECT();
            _response.result = await db.UPDATE_ONE(
                Utils.CONSTANT.TABLE_NAMES.PRODUCT,
                {
                    _id: new ObjectId(_id),
                },
                { ...req.body, updated_on: new Date() }
            );
        }
    } catch (err: any) {
        _response.error(`[ERROR] [REQUEST] [UPDATE-PRODUCT]`, err);
    }
    res.status(_response.status).send(_response.updateRequestTime());
};

const link = async (req: Request, res: Response) => {
    let _response = new ResponseModel(`[INFO] [REQUEST] [LINK-PRODUCT]`);
    try {
        let _id = req.params["id"];
        if (Object.keys(req.body).length > 0 && !!_id) {
            await db.CONNECT();
            _response.result = await db.UPDATE_WITH_UPSERT(
                Utils.CONSTANT.TABLE_NAMES.PRODUCT_TABLET_MAPPING,
                {
                    product_id: _id,
                },
                { tablets:req.body,product_id: _id }
            );
        }
    } catch (err: any) {
        _response.error(`[ERROR] [REQUEST] [LINK-PRODUCT]`, err);
    }
    res.status(_response.status).send(_response.updateRequestTime());
};


const _delete = async (req: Request, res: Response) => {
    let _response = new ResponseModel(`[INFO] [REQUEST] [DELETE-PRODUCT]`);
    try {
        let _id = req.params["id"];
        if (!!_id) {
            await db.CONNECT();
            _response.result = await db.REMOVE(
                Utils.CONSTANT.TABLE_NAMES.PRODUCT,
                {
                    _id: new ObjectId(_id),
                },
               );
        }
    } catch (err: any) {
        _response.error(`[ERROR] [REQUEST] [DELETE-PRODUCT]`, err);
    }
    res.status(_response.status).send(_response.updateRequestTime());
};


export default {
    create,
    getAll,
    getById,
    update,
    delete:_delete,
    link
};
