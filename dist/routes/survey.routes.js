"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const survey_controller_1 = __importDefault(require("../controllers/survey.controller"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/getdetailsbyid/:id', survey_controller_1.default.getDetailsById);
router.get('/getall', survey_controller_1.default.getAll);
router.post('/create', survey_controller_1.default.create);
// router.put('/update/:id', QuestionController.update);
// router.delete('/delete/:id', QuestionController.delete);
exports.default = router;
//# sourceMappingURL=survey.routes.js.map