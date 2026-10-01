import { Request, Response } from 'express';

export class GeneralController {
    
    // Controlador para el Hello World
    static async helloWorld(req: Request, res: Response) {
        let status = 200;
        try {
            return res.status(status).json({ mensaje: "Hola Mundo - API TurnosRed" });
        } catch (error: any) {
            status = 500;
            return res.status(status).json({ error: error.message || "Error interno del servidor" });
        }
    }

    // Controlador para rutas no encontradas (404)
    static async notFound(req: Request, res: Response) {
        let status = 404;
        try {
            // Simulamos una validación previa que falla porque la ruta no existe
            throw new Error("La ruta solicitada no fue encontrada en el servidor");
        } catch (error: any) {
            return res.status(status).json({ error: error.message });
        }
    }
}