import { Medico } from '../models/medico.model.js';

export class MedicoService {
  // Aquí guardaremos los médicos temporalmente
  private static medicos: Medico[] = [];
  private static idActual = 1;

  static async obtenerTodos(): Promise<Medico[]> {
    return this.medicos;
  }

  static async obtenerPorId(id: number): Promise<Medico | undefined> {
    return this.medicos.find(medico => medico.id === id);
  }

  static async crear(datos: Omit<Medico, 'id'>): Promise<Medico> {
    const nuevoMedico: Medico = {
      id: this.idActual++,
      ...datos
    };
    this.medicos.push(nuevoMedico);
    return nuevoMedico;
  }

  static async actualizar(id: number, datos: Partial<Medico>): Promise<Medico | undefined> {
    const indice = this.medicos.findIndex(medico => medico.id === id);
    if (indice === -1) return undefined; // Si no lo encuentra, devuelve undefined
    
    // Si lo encuentra, actualiza sus datos
    this.medicos[indice] = { ...this.medicos[indice], ...datos };
    return this.medicos[indice];
  }

  static async eliminar(id: number): Promise<boolean> {
    const indice = this.medicos.findIndex(medico => medico.id === id);
    if (indice === -1) return false;
    
    this.medicos.splice(indice, 1); // Lo borra de la lista
    return true;
  }
}