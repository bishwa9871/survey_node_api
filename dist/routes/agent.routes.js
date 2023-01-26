"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const agent_controller_1 = __importDefault(require("../controllers/agent.controller"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/getbyid/:id', agent_controller_1.default.getById);
router.get('/getall', agent_controller_1.default.getAll);
router.post('/create', agent_controller_1.default.create);
router.put('/update/:id', agent_controller_1.default.update);
router.delete('/delete/:id', agent_controller_1.default.delete);
exports.default = router;
//# sourceMappingURL=agent.routes.js.map