import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../../config/prisma';
import { requireRoles } from '../../middlewares/auth';

const router = Router();

const upsertSchema = z.object({
  specialty: z.string().min(2),
  registryId: z.string().optional(),
  phone: z.string().optional(),
});

router.post('/profile', requireRoles('PROFESSIONAL', 'ADMIN'), async (req, res, next) => {
  try {
    const data = upsertSchema.parse(req.body);
    const auth = (req as any).user as { id: string; role: string };
    const user = await prisma.user.findUnique({ where: { id: auth.id } });
    if (!user) return res.status(401).json({ message: 'Usuário não encontrado' });

    let professionalId = user.professionalId ?? undefined;
    if (!professionalId) {
      const created = await prisma.professional.create({ data: {
        specialty: data.specialty,
        registryId: data.registryId,
        phone: data.phone,
      }});
      await prisma.user.update({ where: { id: user.id }, data: { professionalId: created.id } });
      professionalId = created.id;
    } else {
      await prisma.professional.update({ where: { id: professionalId }, data: {
        specialty: data.specialty,
        registryId: data.registryId,
        phone: data.phone,
      }});
    }

    const profile = await prisma.professional.findUnique({ where: { id: professionalId } });
    res.status(201).json(profile);
  } catch (err) { next(err); }
});

router.get('/', requireRoles('ADMIN'), async (_req, res, next) => {
  try {
    const pros = await prisma.professional.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(pros);
  } catch (err) { next(err); }
});

export default router;


