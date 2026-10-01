import { Request, Response, NextFunction } from 'express';
import { TurnoService } from '../services/turno.service.js';

export class TurnoController {
  
  static async obtenerTodos(req: Request, res: Response, next: NextFunction) {
    try {
      // Le pasamos req.query al servicio para que filtre
      const turnos = await TurnoService.obtenerTodos(req.query);
      res.status(200).json(turnos);
    } catch (error) {
      next({
        status: 500,
        message: "Error al obtener los turnos",
        code: "INTERNAL_ERROR"
      });
    }
  }

  static async obtenerPorId(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const turno = await TurnoService.obtenerPorId(id);
      
      if (!turno) {
        return next({
          status: 404,
          message: "Turno no encontrado",
          code: "NOT_FOUND"
        });
      }
      
      res.status(200).json(turno);
    } catch (error) {
      next(error);
    }
  }

  static async crear(req: Request, res: Response, next: NextFunction) {
    try {
      const nuevoTurno = await TurnoService.crear(req.body);
      res.status(201).json(nuevoTurno);
    } catch (error) {
      next({
        status: 400,
        message: "Error al crear el turno",
        code: "BAD_REQUEST"
      });
    }
  }

  static async actualizar(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const turnoActualizado = await TurnoService.actualizar(id, req.body);
      
      if (!turnoActualizado) {
        return next({
          status: 404,
          message: "Turno no encontrado para actualizar",
          code: "NOT_FOUND"
        });
      }
      
      res.status(200).json(turnoActualizado);
    } catch (error) {
      next(error);
    }
  }

  static async eliminar(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const eliminado = await TurnoService.eliminar(id);
      
      if (!eliminado) {
        return next({
          status: 404,
          message: "Turno no encontrado para eliminar",
          code: "NOT_FOUND"
        });
      }
      
      res.status(204).send(); // 204 significa "sin contenido", se usa al borrar
    } catch (error) {
      next(error);
    }
  }
}