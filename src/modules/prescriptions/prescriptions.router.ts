import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../../config/prisma';
import { requireRoles } from '../../middlewares/auth';

const router = Router();

const createSchema = z.object({
  patientId: z.string().cuid(),
  content: z.string().min(3),
});

router.post('/', requireRoles('PROFESSIONAL', 'ADMIN'), async (req, res, next) => {
  try {
    const data = createSchema.parse(req.body);
    const auth = (req as any).user as { id: string; role: string };
    const user = await prisma.user.findUnique({ where: { id: auth.id } });
    if (!user?.professionalId) return res.status(400).json({ message: 'Profissional não vinculado' });
    const created = await prisma.prescription.create({ data: {
      patientId: data.patientId,
      professionalId: user.professionalId,
      content: data.content,
      signedAt: new Date(),
    }});
    res.status(201).json(created);
  } catch (err) { next(err); }
});

router.get('/', requireRoles('ADMIN', 'PROFESSIONAL'), async (_req, res, next) => {
  try {
    const list = await prisma.prescription.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(list);
  } catch (err) { next(err); }
});

export default router;


