import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly usuariosService: UsuariosService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const permissoes = this.reflector.get<string[]>(
      'permissoes',
      context.getHandler(),
    );
    if (!permissoes || permissoes.length === 0) return true;
    const request = context.switchToHttp().getRequest();
    const { id } = request.user;
    return await this.usuariosService.permitido(id, permissoes);
  }
}
