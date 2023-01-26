import ProductController from '../controllers/product.controller';
import express from 'express';
const router = express.Router();

router.get('/getbyid/:id', ProductController.getById);
router.get('/getall', ProductController.getAll);
router.post('/create', ProductController.create);
router.post('/link/:id', ProductController.link);
router.put('/update/:id', ProductController.update);
router.delete('/delete/:id', ProductController.delete);

export default router;