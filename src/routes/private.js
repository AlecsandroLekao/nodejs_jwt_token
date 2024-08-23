import express from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/listar-usuarios', async (req, res) => {
  const users = await prisma.user.findMany();

  return res.status(200).json({
    message: 'Usuarios listados com sucesso',
    users,
  });
});

export default router;
