import { Request, Response, NextFunction } from 'express';
import { MedicoService } from '../services/medico.service.js';

export class MedicoController {
  
  static async obtenerTodos(req: Request, res: Response, next: NextFunction) {
    try {
      const medicos = await MedicoService.obtenerTodos(req.query);
      res.status(200).json(medicos);
    } catch (error) {
      next({ status: 500, message: "Error al obtener los médicos", code: "INTERNAL_ERROR" });
    }
  }

  static async obtenerPorId(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const medico = await MedicoService.obtenerPorId(id);
      
      if (!medico) {
        return next({ status: 404, message: "Médico no encontrado", code: "NOT_FOUND" });
      }
      
      res.status(200).json(medico);
    } catch (error) {
      next(error);
    }
  }

  static async crear(req: Request, res: Response, next: NextFunction) {
    try {
      const nuevoMedico = await MedicoService.crear(req.body);
      res.status(201).json(nuevoMedico);
    } catch (error) {
      next({ status: 400, message: "Error al crear el médico", code: "BAD_REQUEST" });
    }
  }

  static async actualizar(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const medicoActualizado = await MedicoService.actualizar(id, req.body);
      
      if (!medicoActualizado) {
        return next({ status: 404, message: "Médico no encontrado para actualizar", code: "NOT_FOUND" });
      }
      
      res.status(200).json(medicoActualizado);
    } catch (error) {
      next(error);
    }
  }

  static async eliminar(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const eliminado = await MedicoService.eliminar(id);
      
      if (!eliminado) {
        return next({ status: 404, message: "Médico no encontrado para eliminar", code: "NOT_FOUND" });
      }
      
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}