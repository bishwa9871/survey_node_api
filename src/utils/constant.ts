enum _database {
  NAME='survey_db'
}

enum _common {
  API_RUNNING_SUCCESSFULLY = "API is running successfully",
  DATABASE_CONNECTED_SUCCESSFULLY = "Database is connected successfully",
  FILE_UPLOADED_SUCCESSFULLY = "File Uploaded Successfully",
  INTERNAL_SERVER_ERROR = "Internal Server Error",
  NOT_FOUND = "Not Found",
  SUCCESS = "Success",
}

enum _prefix{
  TABLET = 'T',
  PRODUCT = 'M4S',
  SURVEY = 'SURVEY',
  FEEDBACK = 'FB',
  MQ_QUESTION='MQ'
}

enum _externalAPI {
  DEMO = "default",
}

enum _environment {
  DEV_NET = "devnet",
}

enum _tableNames {
  AGENT = "agents",
  AGENT_TABLET_MAPPING = "agent_tablet_mapping",
  ANSWER_SET = "answer_sets",
  FEEDBACK = "feedbacks",
  FEEDBACK_INFO = "feedback_info",
  MQ_QUESTION = "mq_questions",
  PRODUCT = "products",
  PRODUCT_TABLET_MAPPING = "product_tablet_mapping",
  QUESTION = "questions",
  SURVEY = "surveys",
  SURVEY_INFO = "survey_info",
  TABLET = "tablets",
  USER = "users",
}

export default {
  COMMON: _common,
  CONNECTION_ENVIRONMENT: _environment,
  DATABASE: _database,
  EXTERNAL_API: _externalAPI,
  PREFIX:_prefix,
  TABLE_NAMES: _tableNames,
};
