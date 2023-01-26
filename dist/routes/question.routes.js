"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const question_controller_1 = __importDefault(require("../controllers/question.controller"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/getbyid/:id', question_controller_1.default.getById);
router.get('/getall', question_controller_1.default.getAll);
router.post('/create', question_controller_1.default.create);
router.put('/update/:id', question_controller_1.default.update);
router.delete('/delete/:id', question_controller_1.default.delete);
exports.default = router;
//# sourceMappingURL=question.routes.js.map