import UserController from '../controllers/user_info.controller';
import express from 'express';
const router = express.Router();

router.get('/login', UserController.login);

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

export default router;