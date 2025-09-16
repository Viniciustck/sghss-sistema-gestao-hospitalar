import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../../config/prisma';
import { requireRoles } from '../../middlewares/auth';

const router = Router();

const createSchema = z.object({
  patientId: z.string().cuid(),
  professionalId: z.string().cuid(),
  scheduledAt: z.string().datetime(),
  type: z.enum(['IN_PERSON', 'TELEMEDICINE']).default('IN_PERSON'),
  notes: z.string().optional(),
});

router.post('/', requireRoles('ADMIN', 'PROFESSIONAL'), async (req, res, next) => {
  try {
    const data = createSchema.parse(req.body);
    const created = await prisma.appointment.create({ data: {
      patientId: data.patientId,
      professionalId: data.professionalId,
      scheduledAt: new Date(data.scheduledAt),
      type: data.type as any,
      notes: data.notes,
    }});
    res.status(201).json(created);
  } catch (err) { next(err); }
});

router.get('/', requireRoles('ADMIN', 'PROFESSIONAL'), async (_req, res, next) => {
  try {
    const list = await prisma.appointment.findMany({ orderBy: { scheduledAt: 'desc' } });
    res.json(list);
  } catch (err) { next(err); }
});

router.patch('/:id/cancel', requireRoles('ADMIN', 'PROFESSIONAL'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const appt = await prisma.appointment.update({ where: { id }, data: { status: 'CANCELED' as any } });
    res.json(appt);
  } catch (err) { next(err); }
});

export default router;


