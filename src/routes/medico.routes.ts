import { Router } from 'express';
import { MedicoController } from '../controllers/medico.controller.js';
import { validarSchema } from '../middlewares/schemaValidator.js';
import { medicoSchema } from '../schemas/medico.schema.js';

const router = Router();

router.get('/', MedicoController.obtenerTodos);
router.get('/:id', MedicoController.obtenerPorId);

router.post('/', validarSchema(medicoSchema), MedicoController.crear);
router.put('/:id', validarSchema(medicoSchema), MedicoController.actualizar);

router.delete('/:id', MedicoController.eliminar);

export default router; 