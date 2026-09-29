import { Turno } from '../models/turno.model.js';
import { turnoEmitter } from '../events/turno.events.js'; // Importamos el bus

let turnosBD: Turno[] = [];

export const TurnoService = {
  cargarTurnosIniciales: (turnos: Turno[]) => {
    turnosBD = turnos;
  },
  obtenerTodos: () => {
    return turnosBD;
  },
  obtenerPorId: (id: number) => {
    return turnosBD.find(t => t.id === id);
  },
  crear: (nuevoTurno: Turno) => {
    turnosBD.push(nuevoTurno);
    // 8B. Emitimos el evento indicando que se creó un turno
    turnoEmitter.emit('turno:creado', nuevoTurno);
    return nuevoTurno;
  },
  actualizar: (id: number, datosActualizados: Partial<Turno>) => {
    const indice = turnosBD.findIndex(t => t.id === id);
    if (indice === -1) return null;
    
    turnosBD[indice] = { ...turnosBD[indice], ...datosActualizados, id };
    // 8B. Emitimos el evento indicando que se actualizó un turno
    turnoEmitter.emit('turno:actualizado', turnosBD[indice]);
    return turnosBD[indice];
  },
  eliminar: (id: number) => {
    const indice = turnosBD.findIndex(t => t.id === id);
    if (indice === -1) return false;
    
    turnosBD.splice(indice, 1);
    // 8B. Emitimos el evento indicando que se eliminó un turno
    turnoEmitter.emit('turno:eliminado', id);
    return true;
  }
};