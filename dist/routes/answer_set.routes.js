"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const answer_set_controller_1 = __importDefault(require("../controllers/answer_set.controller"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/getbyid/:id', answer_set_controller_1.default.getById);
router.get('/getall', answer_set_controller_1.default.getAll);
router.post('/create', answer_set_controller_1.default.create);
router.put('/update/:id', answer_set_controller_1.default.update);
router.delete('/delete/:id', answer_set_controller_1.default.delete);
exports.default = router;
//# sourceMappingURL=answer_set.routes.js.map