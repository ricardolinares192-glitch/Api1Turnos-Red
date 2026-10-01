import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export const validarSchema = (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Intenta validar los datos que llegan en la petición
      schema.parse(req.body);
      next(); // Si todo está bien, lo deja pasar al controlador
    } catch (error) {
      if (error instanceof ZodError) {
        // Si Zod detecta un error, extraemos qué campo falló
        const detalles = error.issues.map(issue => issue.message);

        // Lo enviamos a la red de seguridad con el formato exacto de la consigna
        next({
          status: 400,
          message: "Error de validación en los datos ingresados",
          code: "VALIDATION_ERROR",
          details: detalles
        });
      } else {
        next(error); // Si es otro tipo de error, lo pasa normal
      }
    }
  };
};