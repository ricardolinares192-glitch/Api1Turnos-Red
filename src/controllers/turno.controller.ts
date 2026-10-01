import { Request, Response } from 'express';
import { TurnoService } from '../services/turno.service.js';

export class TurnoController {
  
  static async obtenerTodos(req: Request, res: Response) {
    let status = 200;
    try {
      const turnos = await TurnoService.obtenerTodos(req.query);
      return res.status(status).json(turnos);
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

      const turno = await TurnoService.obtenerPorId(id);
      
      // Validación si no existe
      if (!turno) {
        status = 404;
        throw new Error("Turno no encontrado en la base de datos");
      }
      
      return res.status(status).json(turno);
    } catch (error: any) {
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

      const nuevoTurno = await TurnoService.crear(req.body);
      return res.status(status).json(nuevoTurno);
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
        throw new Error("Faltan datos para actualizar el turno");
      }

      const turnoActualizado = await TurnoService.actualizar(id, req.body);
      
      if (!turnoActualizado) {
        status = 404;
        throw new Error("Turno no encontrado para actualizar");
      }
      
      return res.status(status).json(turnoActualizado);
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

      const eliminado = await TurnoService.eliminar(id);
      
      if (!eliminado) {
        status = 404;
        throw new Error("Turno no encontrado para eliminar");
      }
      
      status = 204;
      return res.status(status).send();
    } catch (error: any) {
      if (status === 200) status = 500;
      return res.status(status).json({ error: error.message });
    }
  }
}