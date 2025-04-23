import { Usuario } from '@prisma/client';
import { Request } from 'express';
import { LoginDto } from './login.dto';

export interface AuthRequest extends Request {
  user: Usuario;
}
