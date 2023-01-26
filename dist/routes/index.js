"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const agent_routes_1 = __importDefault(require("./agent.routes"));
const answer_set_routes_1 = __importDefault(require("./answer_set.routes"));
const feedback_routes_1 = __importDefault(require("./feedback.routes"));
const product_routes_1 = __importDefault(require("./product.routes"));
const mq_question_routes_1 = __importDefault(require("./mq_question.routes"));
const question_routes_1 = __importDefault(require("./question.routes"));
const survey_routes_1 = __importDefault(require("./survey.routes"));
const tablet_routes_1 = __importDefault(require("./tablet.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
exports.default = {
    agent: agent_routes_1.default,
    answer: answer_set_routes_1.default,
    feedback: feedback_routes_1.default,
    product: product_routes_1.default,
    mq_question: mq_question_routes_1.default,
    question: question_routes_1.default,
    survey: survey_routes_1.default,
    tablet: tablet_routes_1.default,
    user: user_routes_1.default
};
//# sourceMappingURL=index.js.map