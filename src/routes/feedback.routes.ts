import FeedbackController from '../controllers/feedback.controller';
import express from 'express';
const router = express.Router();

router.get('/getdetailsbyid/:id', FeedbackController.getDetailsById);
router.get('/getall', FeedbackController.getAll);
router.post('/create', FeedbackController.create);


export default router;