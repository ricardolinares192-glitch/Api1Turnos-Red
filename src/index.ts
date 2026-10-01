import express from 'express';
import fs from 'node:fs/promises';
import { createServer } from 'node:http'; // Importamos el servidor nativo
import { Server } from 'socket.io'; // Importamos Socket.IO
import turnoRoutes from './routes/turno.routes.js';
import medicoRoutes from './routes/medico.routes.js';
import { errorHandler } from './middlewares/errorHandler.js'; // Cambiado a .js por consistencia
import { TurnoService } from './services/turno.service.js';
import { TurnoCrudo, Turno } from './models/turno.model.js';
import { turnoEmitter } from './events/turno.events.js';
import { GeneralController } from './controllers/general.controller.js'; // <-- NUEVO

process.loadEnvFile();
const puerto = process.env.PORT || 3000;
const rutaArchivo = process.env.DATA_PATH || './turnos.json';

const app = express();

// 9A. Creamos el servidor HTTP y acoplamos Socket.IO
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*', // Permite conexiones desde cualquier cliente web
  }
});

app.use(express.json());

// ==========================================
// NUEVO: Endpoint de bienvenida (Hello World)
// ==========================================
app.get('/', GeneralController.helloWorld);

// Rutas principales de la API
app.use('/turnos', turnoRoutes);
app.use('/medicos', medicoRoutes);

// ==========================================
// NUEVO: Middleware para rutas no encontradas (404)
// ==========================================
app.use(GeneralController.notFound);

// Middleware de manejo de errores global (Siempre debe ir debajo de todas las rutas)
app.use(errorHandler); 

function normalizarTurnos(turnosCrudos: TurnoCrudo[]): Turno[] {
  const turnosAceptados: Turno[] = [];
  for (const crudo of turnosCrudos) {
    const idNormalizado = Number(crudo.id);
    if (!Number.isInteger(idNormalizado) || idNormalizado <= 0) continue;
    
    turnosAceptados.push({
      id: idNormalizado,
      paciente: crudo.paciente.trim(),
      documento: String(crudo.documento).trim(),
      especialidad: crudo.especialidad.toLowerCase().trim(),
      fecha: crudo.fecha.trim(),
      hora: crudo.hora.replace('.', ':').trim(),
      confirmado: String(crudo.confirmado).toLowerCase().trim() === 'si'
    });
  }
  return turnosAceptados;
}

// Escuchamos cuando un cliente web se conecta al servidor
io.on('connection', (socket) => {
  console.log(`📡 [Socket.IO] Un cliente web se conectó con ID: ${socket.id}`);
});

// ==========================================
// 9B. CONEXIÓN: EVENT EMITTER -> SOCKET.IO
// ==========================================

turnoEmitter.on('turno:creado', (turno: Turno) => {
  console.log(`[EVENTO INTERNO] 🟢 Nuevo turno para: ${turno.paciente}`);
  io.emit('turno:nuevo', turno);
});

turnoEmitter.on('turno:actualizado', (turno: Turno) => {
  console.log(`[EVENTO INTERNO] 🟡 Turno ID ${turno.id} modificado.`);
  io.emit('turno:actualizado', turno);
});

turnoEmitter.on('turno:eliminado', (id: number) => {
  console.log(`[EVENTO INTERNO] 🔴 Turno ID ${id} eliminado.`);
  io.emit('turno:eliminado', id);
});

// ==========================================

async function iniciarServidor() {
  try {
    const data = await fs.readFile(rutaArchivo, 'utf-8');
    const turnosCrudos: TurnoCrudo[] = JSON.parse(data);
    
    const turnosProcesados = normalizarTurnos(turnosCrudos);
    TurnoService.cargarTurnosIniciales(turnosProcesados);
    
    httpServer.listen(puerto, () => {
      console.log(`🚀 Servidor Express y WebSockets funcionando en http://localhost:${puerto}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
  }
}

iniciarServidor();