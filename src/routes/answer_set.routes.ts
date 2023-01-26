import AnswerSetController from '../controllers/answer_set.controller';
import express from 'express';
const router = express.Router();

router.get('/getbyid/:id', AnswerSetController.getById);
router.get('/getall', AnswerSetController.getAll);
router.post('/create', AnswerSetController.create);
router.put('/update/:id', AnswerSetController.update);
router.delete('/delete/:id', AnswerSetController.delete);


export default router;