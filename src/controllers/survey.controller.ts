import { Request, response, Response } from "express";
import { ResponseModel } from "../models/response.model";
import db from "../config/database";
import { Utils } from "../utils";
import { ObjectId } from "mongodb";


const getAll = async (req: Request, res: Response) => {
    let _response = new ResponseModel(`[INFO] [REQUEST] [GET-ALL-SURVEY]`);
    try {
        await db.CONNECT();
        _response.result = await db.FIND_ALL_SURVEY_WITH_AGENT(
            Utils.CONSTANT.TABLE_NAMES.SURVEY
        );
    } catch (err: any) {
        _response.error(`[ERROR] [REQUEST] [GET-ALL-SURVEY]`, err);
    }
    res.status(_response.status).send(_response.updateRequestTime());
};

const getDetailsById = async (req: Request, res: Response) => {
    let _response = new ResponseModel(`[INFO] [REQUEST] [GET-DETAILS-BY-ID-SURVEY]`);
    try {
        await db.CONNECT();
        let _id = req.params["id"];
        let surveyDetails = await db.FIND_DOCUMENT_WITH_FILTER(
            Utils.CONSTANT.TABLE_NAMES.SURVEY_INFO,
            {
                surveyId: _id,
            });

        let _userDetails = await db.FIND_DOCUMENT_WITH_FILTER(
            Utils.CONSTANT.TABLE_NAMES.SURVEY,
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
            }, surveyDetails
        };

        if (!!!_response.result) _response.notFound();
    } catch (err: any) {
        _response.error(`[ERROR] [REQUEST] [GET-DETAILS-BY-ID-SURVEY]`, err);
    }
    res.status(_response.status).send(_response.updateRequestTime());
};


const create = async (req: Request, res: Response) => {
    let _response = new ResponseModel(`[INFO] [REQUEST] [CREATE-SURVEY]`);
    try {
        if (Object.keys(req.body).length > 0) {
            await db.CONNECT();
            let _count = await db.COUNT(Utils.CONSTANT.TABLE_NAMES.SURVEY);
            let survey_code: string = Utils.CONSTANT.PREFIX.SURVEY;
            
            if (_count == 0) {
                survey_code += '1'.padStart(10, '0');
            }
            else {
                let _lastSurvey = await db.FIND_DOCUMENT_WITH_LIMIT(Utils.CONSTANT.TABLE_NAMES.SURVEY, 1, { created_on: -1 });
                survey_code += (parseInt(_lastSurvey[0].code.split(survey_code)[1]) + 1).toString().padStart(10, '0');
            }

            let _userId = req.body['userId'];
            let resp = await db.INSERT_ONE(Utils.CONSTANT.TABLE_NAMES.SURVEY, { ...req.body['userDetails'], code: survey_code, userId: _userId,createdOn:new Date() })
            for (let iCount = 0; iCount < req.body['surveyDetails'].length; iCount++) {
                let _questionId = req.body['surveyDetails'][iCount]._id
                delete req.body['surveyDetails'][iCount]._id;
                await db.INSERT_ONE(
                    Utils.CONSTANT.TABLE_NAMES.SURVEY_INFO,
                    {
                        ...req.body['surveyDetails'][iCount], surveyId: resp.insertedId.toString(), questiondId: _questionId, created_on: new Date()
                    }
                );
            }
        }
    } catch (err: any) {
        _response.error(`[ERROR] [REQUEST] [CREATE-SURVEY]`, err);
    }
    res.status(_response.status).send(_response.updateRequestTime());
};

// const update = async (req: Request, res: Response) => {
//     let _response = new ResponseModel(`[INFO] [REQUEST] [UPDATE-SURVEY]`);
//     try {
//         let _id = req.params["id"];
//         if (Object.keys(req.body).length > 0 && !!_id) {
//             await db.CONNECT();
//             _response.result = await db.UPDATE_ONE(
//                 Utils.CONSTANT.TABLE_NAMES.QUESTION,
//                 {
//                     _id: new ObjectId(_id),
//                 },
//                 { ...req.body, updated_on: new Date() }
//             );
//         }
//     } catch (err: any) {
//         _response.error(`[ERROR] [REQUEST] [UPDATE-SURVEY]`, err);
//     }
//     res.status(_response.status).send(_response.updateRequestTime());
// };


// const _delete = async (req: Request, res: Response) => {
//     let _response = new ResponseModel(`[INFO] [REQUEST] [DELETE-QUESTION]`);
//     try {
//         let _id = req.params["id"];
//         if (!!_id) {
//             await db.CONNECT();
//             _response.result = await db.REMOVE(
//                 Utils.CONSTANT.TABLE_NAMES.QUESTION,
//                 {
//                     _id: new ObjectId(_id),
//                 },
//             );
//         }
//     } catch (err: any) {
//         _response.error(`[ERROR] [REQUEST] [DELETE-QUESTION]`, err);
//     }
//     res.status(_response.status).send(_response.updateRequestTime());
// };



export default {
    create,
    getAll,
    getDetailsById,
    // update,
    // delete: _delete
};
