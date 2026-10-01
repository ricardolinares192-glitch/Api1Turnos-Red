import { Request, Response } from 'express';
import { MedicoService } from '../services/medico.service.js';

export class MedicoController {
  
  static async obtenerTodos(req: Request, res: Response) {
    let status = 200;
    try {
      const medicos = await MedicoService.obtenerTodos(req.query);
      return res.status(status).json(medicos);
    } catch (error: any) {
      status = 500;
      return res.status(status).json({ error: error.message || "Error interno del servidor" });
    }
  }

  static async obtenerPorId(req: Request, res: Response) {
    let status = 200;
    try {
      const id = Number(req.params.id);
      
      // Validación previa
      if (isNaN(id)) {
        status = 400;
        throw new Error("El ID proporcionado no es válido");
      }

      const medico = await MedicoService.obtenerPorId(id);
      
      // Validación si no existe
      if (!medico) {
        status = 404;
        throw new Error("Médico no encontrado en la base de datos");
      }
      
      return res.status(status).json(medico);
    } catch (error: any) {
      // Si el error no cambió el status (sigue en 200), fue un error inesperado
      if (status === 200) status = 500;
      return res.status(status).json({ error: error.message });
    }
  }

  static async crear(req: Request, res: Response) {
    let status = 201;
    try {
      // Validación previa de cuerpo vacío
      if (!req.body || Object.keys(req.body).length === 0) {
        status = 400;
        throw new Error("El cuerpo de la petición no puede estar vacío");
      }

      const nuevoMedico = await MedicoService.crear(req.body);
      return res.status(status).json(nuevoMedico);
    } catch (error: any) {
      if (status === 201) status = 400;
      return res.status(status).json({ error: error.message });
    }
  }

  static async actualizar(req: Request, res: Response) {
    let status = 200;
    try {
      const id = Number(req.params.id);
      
      if (isNaN(id)) {
        status = 400;
        throw new Error("El ID proporcionado no es válido");
      }

      if (!req.body || Object.keys(req.body).length === 0) {
        status = 400;
        throw new Error("Faltan datos para actualizar el médico");
      }

      const medicoActualizado = await MedicoService.actualizar(id, req.body);
      
      if (!medicoActualizado) {
        status = 404;
        throw new Error("Médico no encontrado para actualizar");
      }
      
      return res.status(status).json(medicoActualizado);
    } catch (error: any) {
      if (status === 200) status = 500;
      return res.status(status).json({ error: error.message });
    }
  }

  static async eliminar(req: Request, res: Response) {
    let status = 200;
    try {
      const id = Number(req.params.id);
      
      if (isNaN(id)) {
        status = 400;
        throw new Error("El ID proporcionado no es válido");
      }

      const eliminado = await MedicoService.eliminar(id);
      
      if (!eliminado) {
        status = 404;
        throw new Error("Médico no encontrado para eliminar");
      }
      
      status = 204;
      return res.status(status).send();
    } catch (error: any) {
      if (status === 200) status = 500;
      return res.status(status).json({ error: error.message });
    }
  }
}