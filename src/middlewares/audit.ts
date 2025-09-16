import type { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prisma';

export async function auditLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  const user = (req as any).user as { id?: string } | undefined;
  const ip = req.ip;
  const userAgent = req.headers['user-agent'];
  res.on('finish', async () => {
    try {
      await prisma.auditLog.create({
        data: {
          userId: user?.id,
          action: `${req.method} ${req.path} ${res.statusCode} ${Date.now() - start}ms`,
          entity: undefined,
          entityId: undefined,
          ip,
          userAgent,
        },
      });
    } catch {
      // swallow audit errors
    }
  });
  next();
}
