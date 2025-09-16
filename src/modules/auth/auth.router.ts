import { Router } from 'express';
import { z } from 'zod';
import { loginUser, registerUser } from './auth.controller';

const router = Router();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  fullName: z.string().min(2),
  role: z.enum(['PATIENT', 'PROFESSIONAL', 'ADMIN']).default('PATIENT'),
});

router.post('/register', async (req, res, next) => {
  try {
    const data = registerSchema.parse(req.body);
    const user = await registerUser(data);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

router.post('/login', async (req, res, next) => {
  try {
    const data = loginSchema.parse(req.body);
    const token = await loginUser(data);
    res.json(token);
  } catch (err) {
    next(err);
  }
});

export default router;


