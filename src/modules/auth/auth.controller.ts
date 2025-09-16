import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import { prisma } from '../../config/prisma';

const JWT_SECRET = process.env.JWT_SECRET ?? 'dev_secret_change_me';
const JWT_EXPIRES_IN = '1h';

export async function registerUser(input: {
  email: string;
  password: string;
  fullName: string;
  role: 'PATIENT' | 'PROFESSIONAL' | 'ADMIN';
}): Promise<{ id: string; email: string; role: string }> {
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) throw new createError.Conflict('E-mail já cadastrado');

  const passwordHash = await bcrypt.hash(input.password, 10);
  const user = await prisma.user.create({
    data: {
      email: input.email,
      passwordHash,
      fullName: input.fullName,
      role: input.role as any,
    },
    select: { id: true, email: true, role: true },
  });
  return user as any;
}

export async function loginUser(input: { email: string; password: string }): Promise<{ token: string }>{
  const user = await prisma.user.findUnique({ where: { email: input.email } });
  if (!user) throw new createError.Unauthorized('Credenciais inválidas');

  const ok = await bcrypt.compare(input.password, user.passwordHash);
  if (!ok) throw new createError.Unauthorized('Credenciais inválidas');

  const token = jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  return { token };
}


