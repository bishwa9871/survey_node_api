import SurveyController from '../controllers/survey.controller';
import express from 'express';
const router = express.Router();

router.get('/getdetailsbyid/:id', SurveyController.getDetailsById);
router.get('/getall', SurveyController.getAll);
router.post('/create', SurveyController.create);
// router.put('/update/:id', QuestionController.update);
// router.delete('/delete/:id', QuestionController.delete);


export default router;