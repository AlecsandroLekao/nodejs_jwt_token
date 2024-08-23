import express from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express.Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

app.post('/cadastros', async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const userdb = await prisma.user.create({
      data: {
        email,
        name,
        password: hash,
      },
    });
    return res.status(200).json(userdb);
  } catch (error) {
    return res.status(500).json('ocoreu um erro ' + error);
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email:email },
  });

  if (!user) {
    return res.status(404).json({ message: 'ocorreu um erro' });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(403).json({ message: 'senha invalida' });
  }

  console.log('TOKEN '+ JWT_SECRET)
  
  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1m' });

  return res.status(200).json(token);
});
export default app;
