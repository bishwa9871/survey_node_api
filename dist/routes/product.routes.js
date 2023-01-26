"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/getbyid/:id', product_controller_1.default.getById);
router.get('/getall', product_controller_1.default.getAll);
router.post('/create', product_controller_1.default.create);
router.post('/link/:id', product_controller_1.default.link);
router.put('/update/:id', product_controller_1.default.update);
router.delete('/delete/:id', product_controller_1.default.delete);
exports.default = router;
//# sourceMappingURL=product.routes.js.map