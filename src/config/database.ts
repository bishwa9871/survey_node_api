import { MongoClient, ObjectId } from "mongodb";
import { Utils } from "../utils";
const url =
  "mongodb+srv://survey_db:VYrA8dhR2Y2gfz05@survey-app.swv44jo.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(url);
let _database: any;

const connect = async () => {
  try {
    if (!!!_database) {
      await client.connect();
      Utils.LOGGER.info(`[INFO] [DATABASE] [CONNECTED-SUCCESSFULLY]`);
      _database = client.db(Utils.CONSTANT.DATABASE.NAME);
    }
  } catch (err: any) {
    Utils.LOGGER.error(
      `[ERROR] [CONNECTION-OPEN] : [${JSON.stringify(err.message)}]`
    );
    throw new Error('Error in DB Connection')
  }
};

const countDocument = async (collectionName: string) => {
  try {
    let _collection = _database.collection(collectionName);
    return await _collection.count();
  } catch (err: any) {
    Utils.LOGGER.error(
      `[ERROR] [COUNT-DOCUMENT] [${collectionName}]  : [${JSON.stringify(
        err.message
      )}]`
    );
  }
};


const findAllDocument = async (collectionName: string) => {
  try {
    let _collection = _database.collection(collectionName);
    return await _collection.find({}).sort({ created_on: -1 }).toArray();
  } catch (err: any) {
    Utils.LOGGER.error(
      `[ERROR] [FIND-ALL-DOCUMENT] [${collectionName}]  : [${JSON.stringify(
        err.message
      )}]`
    );
  }
};

const findAllProductWithTablet = async (collectionName: string) => {
  try {
    let _collection = _database.collection(collectionName);

    return await _collection.aggregate([
      { "$addFields": { "_product_id": { "$toString": "$_id" } } },
      {
        $lookup: {
          "from": 'product_tablet_mapping',
          "localField": "_product_id",
          "foreignField": "product_id",
          "as": "product_tablets"
        }
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$product_tablets", 0] }, "$$ROOT"] } }
      },
      // { $project: { tablets:1,product_id:0,_product_id:0} },
    ]).sort({ created_on: -1 }).toArray();
  } catch (err: any) {
    Utils.LOGGER.error(
      `[ERROR] [FIND-ALL-PRODUCT-WITH-TABLET] [${collectionName} & product_tablet_mpping ] : [${JSON.stringify(
        err.message
      )}]`
    );
  }
};

const findAllAgentWithTablet = async (collectionName: string) => {
  try {
    let _collection = _database.collection(collectionName);

    return await _collection.aggregate([
      { "$addFields": { "tablet_id": { "$toObjectId": "$tablet" } } },
      {
        $lookup: {
          "from": 'tablets',
          "localField": "tablet_id",
          "foreignField": "_id",
          "as": "tablet_info"
        }
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$tablet_info", 0] }, "$$ROOT"] } }
      },
      // { $project: { tablets:1,product_id:0,_product_id:0} },
    ]).sort({ created_on: -1 }).toArray();
  } catch (err: any) {
    Utils.LOGGER.error(
      `[ERROR] [FIND-ALL-AGENT-WITH-TABLET] [${collectionName} & tablets ] : [${JSON.stringify(
        err.message
      )}]`
    );
  }
};

const findAllSurveyWithAgent = async (collectionName: string) => {
  try {
    let _collection = _database.collection(collectionName);

    return await _collection.aggregate([
      { "$addFields": { "user_id": { "$toObjectId": "$userId" } } },
      {
        $lookup: {
          "from": 'users',
          "localField": "user_id",
          "foreignField": "_id",
          "as": "users_info"
        }
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$users_info", 0] }, "$$ROOT"] } }
      },
    ]).sort({ created_on: -1 }).toArray();
  } catch (err: any) {
    Utils.LOGGER.error(
      `[ERROR] [FIND-ALL-SURVEY-WITH-AGENT] [agent & ${collectionName}] : [${JSON.stringify(
        err.message
      )}]`
    );
  }
};

const findAllMQQuestions = async (collectionName: string) => {
  try {
    let _collection = _database.collection(collectionName);

    return await _collection.aggregate([
      { "$addFields": { "answer_id": { "$toObjectId": "$answerId" } } },
      {
        $lookup: {
          "from": `${Utils.CONSTANT.TABLE_NAMES.ANSWER_SET}`,
          "localField": "answer_id",
          "foreignField": "_id",
          "as": "answer_info"
        }
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$answer_info", 0] }, "$$ROOT"] } }
      },
    ]).sort({ created_on: -1 }).toArray();
  } catch (err: any) {
    Utils.LOGGER.error(
      `[ERROR] [FIND-ALL-SURVEY-WITH-AGENT] [agent & ${collectionName}] : [${JSON.stringify(
        err.message
      )}]`
    );
  }
};

const findDocumentWithLimit = async (collectionName: string, limit: number, sortFilter: Object) => {
  try {
    let _collection = _database.collection(collectionName);
    if (!!!sortFilter)
      return await _collection.find({}).limit(limit).toArray();
    else
      return await _collection.find({}).sort(sortFilter).limit(limit).toArray();

  } catch (err: any) {
    Utils.LOGGER.error(
      `[ERROR] [FIND-DOCUMENT-WITH-LIMIT] [${collectionName}]  : [${JSON.stringify(
        err.message
      )}]`
    );
  }
};

const findDocumentWithFilter = async (
  collectionName: string,
  filter: Object
) => {
  try {
    let _collection = await _database.collection(collectionName);
    return await _collection.find(filter).toArray();
  } catch (err: any) {
    Utils.LOGGER.error(
      `[ERROR] [FIND-ALL-DOCUMENT-WITH-FILTER] [${collectionName}]  : [${JSON.stringify(
        err.message
      )}]`
    );
  }
};

const insert_one = async (collectionName: string, data: Object) => {
  try {
    let _collection = await _database.collection(collectionName);
    return await _collection.insertOne(data);
  } catch (err: any) {
    Utils.LOGGER.error(
      `[ERROR] [INSERT-ONE] [${collectionName}]  : [${JSON.stringify(
        err.message
      )}]`
    );
  }
};

const update_one = async (
  collectionName: string,
  filter: Object,
  data: Object
) => {
  try {
    let _collection = _database.collection(collectionName);
    return await _collection.updateOne(filter, { $set: data });
  } catch (err: any) {
    Utils.LOGGER.error(
      `[ERROR] [UPDATE-ONE] [${collectionName}]  : [${JSON.stringify(
        err.message
      )}]`
    );
  }
};

const update_with_upsert = async (
  collectionName: string,
  filter: Object,
  data: Object
) => {
  try {
    let _collection = _database.collection(collectionName);
    return await _collection.update(filter, { $set: data }, { upsert: true });
  } catch (err: any) {
    Utils.LOGGER.error(
      `[ERROR] [UPDATE-WITH-UPSERT] [${collectionName}]  : [${JSON.stringify(
        err.message
      )}]`
    );
  }
};

const remove = async (
  collectionName: string,
  filter: Object
) => {
  try {
    let _collection = _database.collection(collectionName);
    return await _collection.remove(filter);
  } catch (err: any) {
    Utils.LOGGER.error(
      `[ERROR] [REMOVE] [${collectionName}]  : [${JSON.stringify(
        err.message
      )}]`
    );
  }
};

function close() {
  try {
    if (!!client) {
      client.close();
      _database = undefined;
    }
  } catch (err: any) {
    Utils.LOGGER.error(
      `[ERROR] [CONNECTION-CLOSE] : [${JSON.stringify(err.message)}]`
    );
  }
}

export default {
  CONNECT: connect,
  COUNT: countDocument,
  CLOSE_CONNECTION: close,
  FIND_ALL_DOCUMENT: findAllDocument,
  FIND_DOCUMENT_WITH_LIMIT: findDocumentWithLimit,
  FIND_DOCUMENT_WITH_FILTER: findDocumentWithFilter,
  FIND_ALL_PRODUCT_WITH_TABLET: findAllProductWithTablet,
  FIND_ALL_AGENT_WITH_TABLET: findAllAgentWithTablet,
  FIND_ALL_SURVEY_WITH_AGENT: findAllSurveyWithAgent,
  INSERT_ONE: insert_one,
  REMOVE: remove,
  UPDATE_ONE: update_one,
  UPDATE_WITH_UPSERT: update_with_upsert
};
