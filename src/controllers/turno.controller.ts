import { Request, Response } from 'express';
import { TurnoService } from '../services/turno.service.js';

export const TurnoController = {
  obtenerTodos: (req: Request, res: Response) => {
    try {
      const turnos = TurnoService.obtenerTodos();
      res.status(200).json(turnos);
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  obtenerPorId: (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const turno = TurnoService.obtenerPorId(id);
    if (!turno) {
      res.status(404).json({ error: 'Turno no encontrado' });
      return;
    }
    res.status(200).json(turno);
  },

  crear: (req: Request, res: Response) => {
    try {
      const nuevoTurno = req.body;
      if (!nuevoTurno.paciente || !nuevoTurno.id) {
        res.status(400).json({ error: 'Faltan datos obligatorios' });
        return;
      }
      const creado = TurnoService.crear(nuevoTurno);
      res.status(201).json(creado);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el turno' });
    }
  },

  actualizar: (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const datos = req.body;
    if (Object.keys(datos).length === 0) {
      res.status(400).json({ error: 'No se enviaron datos para actualizar' });
      return;
    }
    const actualizado = TurnoService.actualizar(id, datos);
    if (!actualizado) {
      res.status(404).json({ error: 'Turno no encontrado' });
      return;
    }
    res.status(200).json(actualizado);
  },

  eliminar: (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const eliminado = TurnoService.eliminar(id);
    if (!eliminado) {
      res.status(404).json({ error: 'Turno no encontrado' });
      return;
    }
    res.status(200).json({ mensaje: 'Turno eliminado correctamente' });
  }
};