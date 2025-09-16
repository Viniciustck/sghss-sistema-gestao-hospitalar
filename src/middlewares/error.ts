import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import createError from 'http-errors';

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ZodError) {
    return res.status(400).json({ message: 'Validação falhou', issues: err.issues });
  }
  if (createError.isHttpError(err)) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  // eslint-disable-next-line no-console
  console.error(err);
  return res.status(500).json({ message: 'Erro interno' });
}


