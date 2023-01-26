"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_info_controller_1 = __importDefault(require("../controllers/user_info.controller"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/login', user_info_controller_1.default.login);
// /**
//  * @swagger
//  * /api/:
//  *   post:
//  *     summary: Fetch data
//  *     tags: [User] 
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               accountIds:
//  *                 type: array
//  *                 items:
//  *                   type: string
//  *     responses:
//  *       200:
//  *         description: Success
//  *         contens:
//  *           application/json:
//  *       404:
//  *         description: Description
//  *       500:
//  *         description: Internal Server Error
//  */
exports.default = router;
//# sourceMappingURL=user.routes.js.map