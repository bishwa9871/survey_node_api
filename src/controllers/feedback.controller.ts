import { Request, response, Response } from "express";
import { ResponseModel } from "../models/response.model";
import db from "../config/database";
import { Utils } from "../utils";
import { ObjectId } from "mongodb";


const getAll = async (req: Request, res: Response) => {
    let _response = new ResponseModel(`[INFO] [REQUEST] [GET-ALL-FEEDBACK]`);
    try {
        await db.CONNECT();
        _response.result = await db.FIND_ALL_SURVEY_WITH_AGENT(
            Utils.CONSTANT.TABLE_NAMES.FEEDBACK
        );
    } catch (err: any) {
        _response.error(`[ERROR] [REQUEST] [GET-ALL-FEEDBACK]`, err);
    }
    res.status(_response.status).send(_response.updateRequestTime());
};

const getDetailsById = async (req: Request, res: Response) => {
    let _response = new ResponseModel(`[INFO] [REQUEST] [GET-DETAILS-BY-ID-FEEDBACK]`);
    try {
        await db.CONNECT();
        let _id = req.params["id"];
        let feedbackDetails = await db.FIND_DOCUMENT_WITH_FILTER(
            Utils.CONSTANT.TABLE_NAMES.FEEDBACK_INFO,
            {
                feedbackId: _id,
            });

        let _userDetails = await db.FIND_DOCUMENT_WITH_FILTER(
            Utils.CONSTANT.TABLE_NAMES.FEEDBACK,
            {
                _id: new ObjectId(_id),
            }
        );
        let { firstName,
            lastName,
            address,
            city,
            state,
            userEmail,
            code ,userId} = _userDetails[0];

        _response.result = {
            _id, userId,userDetails: {
                firstName,
                lastName,
                address,
                city,
                state,
                userEmail,
                code,
            }, feedbackDetails
        };

        if (!!!_response.result) _response.notFound();
    } catch (err: any) {
        _response.error(`[ERROR] [REQUEST] [GET-DETAILS-BY-ID-FEEDBACK]`, err);
    }
    res.status(_response.status).send(_response.updateRequestTime());
};


const create = async (req: Request, res: Response) => {
    let _response = new ResponseModel(`[INFO] [REQUEST] [CREATE-FEEDBACK]`);
    try {
        if (Object.keys(req.body).length > 0) {
            await db.CONNECT();
            let _count = await db.COUNT(Utils.CONSTANT.TABLE_NAMES.FEEDBACK);
            let feedback_code: string = Utils.CONSTANT.PREFIX.FEEDBACK;
            
            if (_count == 0) {
                feedback_code += '1'.padStart(10, '0');
            }
            else {
                let _lastFeedback = await db.FIND_DOCUMENT_WITH_LIMIT(Utils.CONSTANT.TABLE_NAMES.FEEDBACK, 1, { created_on: -1 });
                feedback_code += (parseInt(_lastFeedback[0].code.split(feedback_code)[1]) + 1).toString().padStart(10, '0');
            }

            let _userId = req.body['userId'];
            let resp = await db.INSERT_ONE(Utils.CONSTANT.TABLE_NAMES.FEEDBACK, { ...req.body['userDetails'], code: feedback_code, userId: _userId,createdOn:new Date() })
            for (let iCount = 0; iCount < req.body['feedbackDetails'].length; iCount++) {
                let _questionId = req.body['feedbackDetails'][iCount]._id
                delete req.body['feedbackDetails'][iCount]._id;
                await db.INSERT_ONE(
                    Utils.CONSTANT.TABLE_NAMES.FEEDBACK_INFO,
                    {
                        ...req.body['feedbackDetails'][iCount], feedbackId: resp.insertedId.toString(), questiondId: _questionId, created_on: new Date()
                    }
                );
            }
        }
    } catch (err: any) {
        _response.error(`[ERROR] [REQUEST] [CREATE-FEEDBACK]`, err);
    }
    res.status(_response.status).send(_response.updateRequestTime());
};


export default {
    create,
    getAll,
    getDetailsById,
};
