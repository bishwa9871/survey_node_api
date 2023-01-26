import MQ_QuestionController from '../controllers/mq_question.controller';
import express from 'express';
const router = express.Router();

router.get('/getbyid/:id', MQ_QuestionController.getById);
router.get('/getall', MQ_QuestionController.getAll);
router.post('/create', MQ_QuestionController.create);
router.put('/update/:id', MQ_QuestionController.update);
router.delete('/delete/:id', MQ_QuestionController.delete);


export default router;