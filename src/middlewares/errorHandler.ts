import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    const message = err.message || "Error interno del servidor";
    const code = err.code || "INTERNAL_ERROR";
    const details = err.details || [];

    res.status(status).json({
        status,
        message,
        code,
        details
    });
};