"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const feedback_controller_1 = __importDefault(require("../controllers/feedback.controller"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/getdetailsbyid/:id', feedback_controller_1.default.getDetailsById);
router.get('/getall', feedback_controller_1.default.getAll);
router.post('/create', feedback_controller_1.default.create);
exports.default = router;
//# sourceMappingURL=feedback.routes.js.map