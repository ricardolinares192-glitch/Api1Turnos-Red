import { Router } from 'express';
import { TurnoController } from '../controllers/turno.controller.js';

const router = Router();

router.get('/', TurnoController.obtenerTodos);
router.get('/:id', TurnoController.obtenerPorId);
router.post('/', TurnoController.crear);
router.put('/:id', TurnoController.actualizar);
router.delete('/:id', TurnoController.eliminar);

export default router;