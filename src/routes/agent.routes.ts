import AgentController from '../controllers/agent.controller';
import express from 'express';
const router = express.Router();

router.get('/getbyid/:id', AgentController.getById);
router.get('/getall', AgentController.getAll);
router.post('/create', AgentController.create);
router.put('/update/:id', AgentController.update);
router.delete('/delete/:id', AgentController.delete);


export default router;