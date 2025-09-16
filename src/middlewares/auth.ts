import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET ?? 'dev_secret_change_me';

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) return next();
  const token = header.substring('Bearer '.length);
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { sub: string; role: string };
    (req as any).user = { id: payload.sub, role: payload.role };
  } catch {
    // ignore invalid token; route handlers can enforce stricter checks via requireRoles
  }
  next();
}

export function requireRoles(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user as { id: string; role: string } | undefined;
    if (!user) return res.status(401).json({ message: 'Não autenticado' });
    if (!roles.includes(user.role)) return res.status(403).json({ message: 'Proibido' });
    return next();
  };
}


