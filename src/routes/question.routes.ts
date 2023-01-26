import QuestionController from '../controllers/question.controller';
import express from 'express';
const router = express.Router();

router.get('/getbyid/:id', QuestionController.getById);
router.get('/getall', QuestionController.getAll);
router.post('/create', QuestionController.create);
router.put('/update/:id', QuestionController.update);
router.delete('/delete/:id', QuestionController.delete);


export default router;