import { Permissao } from "@prisma/main/client";

export interface UsuarioPayload {
  sub: string;
  login: string;
  email: string;
  nome: string;
  nomeSocial?: string;
  status: boolean;
  avatar?: string;
  permissao: Permissao;
  iat?: number;
  exp?: number;
}
