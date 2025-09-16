import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../../config/prisma';
import { requireRoles } from '../../middlewares/auth';

const router = Router();

// Criar/atualizar perfil do paciente vinculado ao usuário autenticado
const upsertSchema = z.object({
  documentId: z.string().min(3).optional(),
  birthDate: z.string().datetime().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

router.post('/profile', requireRoles('PATIENT', 'ADMIN'), async (req, res, next) => {
  try {
    const data = upsertSchema.parse(req.body);
    const auth = (req as any).user as { id: string; role: string };
    const user = await prisma.user.findUnique({ where: { id: auth.id } });
    if (!user) return res.status(401).json({ message: 'Usuário não encontrado' });

    let patientId = user.patientId ?? undefined;
    if (!patientId) {
      const created = await prisma.patient.create({ data: {
        documentId: data.documentId,
        birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
        phone: data.phone,
        address: data.address,
      }});
      await prisma.user.update({ where: { id: user.id }, data: { patientId: created.id } });
      patientId = created.id;
    } else {
      await prisma.patient.update({ where: { id: patientId }, data: {
        documentId: data.documentId,
        birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
        phone: data.phone,
        address: data.address,
      }});
    }

    const profile = await prisma.patient.findUnique({ where: { id: patientId } });
    res.status(201).json(profile);
  } catch (err) {
    next(err);
  }
});

router.get('/me', requireRoles('PATIENT'), async (req, res, next) => {
  try {
    const auth = (req as any).user as { id: string; role: string };
    const user = await prisma.user.findUnique({ where: { id: auth.id } });
    if (!user?.patientId) return res.status(404).json({ message: 'Perfil de paciente não encontrado' });
    const profile = await prisma.patient.findUnique({ where: { id: user.patientId } });
    res.json(profile);
  } catch (err) { next(err); }
});

router.get('/', requireRoles('ADMIN'), async (_req, res, next) => {
  try {
    const patients = await prisma.patient.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(patients);
  } catch (err) { next(err); }
});

export default router;


