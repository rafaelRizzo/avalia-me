import express from 'express';
import AvaliacaoController from '../controllers/AvaliacaoController.js';

const router = express.Router();

router.post('/generate', AvaliacaoController.create);
router.get('/verify/:uuid', AvaliacaoController.verify);
router.get('/list-valid-uuids', AvaliacaoController.listValidUUID);

export default router;
