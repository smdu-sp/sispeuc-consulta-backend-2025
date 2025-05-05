import { Usuario } from '@prisma/main/client';
import { Request } from 'express';
import { LoginDto } from './login.dto';

export interface AuthRequest extends Request {
  user: Usuario;
}
