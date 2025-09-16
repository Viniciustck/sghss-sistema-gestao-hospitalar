import { Router } from 'express';
import { requireRoles } from '../../middlewares/auth';
import { z } from 'zod';

const router = Router();

const createRoomSchema = z.object({
  appointmentId: z.string().cuid(),
});

// Stub: gera um link/sala fictícia para teleconsulta (sem WebRTC nessa entrega)
router.post('/room', requireRoles('ADMIN', 'PROFESSIONAL'), async (req, res, next) => {
  try {
    const { appointmentId } = createRoomSchema.parse(req.body);
    const roomUrl = `https://telemed.sghss.local/room/${appointmentId}`;
    res.status(201).json({ appointmentId, roomUrl });
  } catch (err) { next(err); }
});

export default router;


