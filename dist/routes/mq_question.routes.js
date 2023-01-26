"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mq_question_controller_1 = __importDefault(require("../controllers/mq_question.controller"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/getbyid/:id', mq_question_controller_1.default.getById);
router.get('/getall', mq_question_controller_1.default.getAll);
router.post('/create', mq_question_controller_1.default.create);
router.put('/update/:id', mq_question_controller_1.default.update);
router.delete('/delete/:id', mq_question_controller_1.default.delete);
exports.default = router;
//# sourceMappingURL=mq_question.routes.js.map