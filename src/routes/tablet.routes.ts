import TabletController from '../controllers/tablet.controller';
import express from 'express';
const router = express.Router();

router.get('/getbyid/:id', TabletController.getById);
router.get('/getall', TabletController.getAll);
router.post('/create', TabletController.create);
router.put('/update/:id', TabletController.update);
router.delete('/delete/:id', TabletController.delete);


export default router;