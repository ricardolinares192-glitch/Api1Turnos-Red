# TurnosRed - API de Gestión

Prototipo de backend para centralizar la gestión de turnos de centros de atención ambulatoria. El sistema normaliza registros con formatos inconsistentes y provee una API REST con comunicación en tiempo real mediante WebSockets.

## Requisitos previos

Para ejecutar este proyecto, necesitas tener instalado:
* **Node.js**: Versión 20.0.0 o superior (se recomienda usar la versión LTS definida en el archivo `.nvmrc`).
* **NPM**: Gestor de paquetes incluido con Node.js.

## Instrucciones de instalación

1. Clona el repositorio en tu máquina local o descarga los archivos.
2. Abre una terminal en la carpeta del proyecto.
3. Instala las dependencias ejecutando:
   ```bash
   npm install

## 🛠️ Tecnologías Utilizadas
- Node.js, Express y TypeScript
- Zod (para validación de datos)
- Arquitectura en Capas (Rutas, Controladores, Servicios, Modelos)

## 📌 Endpoints Principales

### Médicos (`/medicos`)
- `GET /medicos` : Obtiene todos los médicos. Permite filtros por `?especialidad` y `?disponible`.
- `GET /medicos/:id` : Obtiene un médico por su ID.
- `POST /medicos` : Crea un nuevo médico (Requiere validación Zod).
- `PUT /medicos/:id` : Actualiza un médico existente (Requiere validación Zod).
- `DELETE /medicos/:id` : Elimina un médico.

### Turnos (`/turnos`)
- `GET /turnos` : Obtiene todos los turnos. Permite filtros por `?especialidad`, `?fecha` y `?medicoId`.
- `GET /turnos/:id` : Obtiene un turno por su ID.
- `POST /turnos` : Crea un nuevo turno (Requiere validación Zod).
- `PUT /turnos/:id` : Actualiza un turno.
- `DELETE /turnos/:id` : Elimina un turno.

## 🤖 Tabla de Uso de Inteligencia Artificial

| Herramienta IA | Tarea / Funcionalidad | Prompts utilizados | Modificaciones realizadas al código generado |
| :--- | :--- | :--- | :--- |
| Gemini | Refactorización a Arquitectura en Capas | "Ayúdame a separar mis rutas de turnos en controladores y servicios..." | Se ajustaron los nombres de los métodos y se implementó el manejador de errores global en los catch. |
| Gemini | Implementación de validaciones con Zod | "Crea un schema de Zod para un médico donde la especialidad sea Title Case..." | Se configuraron los mensajes de error personalizados y se integró en el middleware `schemaValidator`. |
| Gemini | Resolución de errores de TypeScript | "Me sale el error ECONNREFUSED y problemas con módulos ES..." | Se ajustaron las extensiones de importación y se eliminaron archivos .js residuales para compilar correctamente. |

---
**Desarrollado por:** Ricardo Linares