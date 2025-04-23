import { ForbiddenException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Usuario } from '@prisma/client';
import { UsuarioPayload } from './models/UsuarioPayload';
import { JwtService } from '@nestjs/jwt';
import { UsuarioToken } from './models/UsuarioToken';
import { UsuarioJwt } from './models/UsuarioJwt';
import { Client as LdapClient } from 'ldapts';


@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) { }

  async login(usuario: Usuario): Promise<UsuarioToken> {
    const { access_token, refresh_token } = await this.getTokens(usuario);
    return { access_token, refresh_token };
  }

  async refresh(usuario: Usuario) {
    const { access_token, refresh_token } = await this.getTokens(usuario);
    return { access_token, refresh_token };
  }

  async getTokens(usuario: UsuarioJwt) {
    const { id, login, nome, nomeSocial, email, status, avatar, permissao } = usuario;
    const payload: UsuarioPayload = { sub: id, login, nome, nomeSocial, email, status, avatar, permissao };
    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
      secret: process.env.JWT_SECRET
    });
    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
      secret: process.env.RT_SECRET
    });
    return { access_token, refresh_token };
  }

  async validateUser(login: string, senha: string) {
    let usuario = await this.usuariosService.buscarPorLogin(login);
    if (!usuario) throw new UnauthorizedException('Credenciais incorretas.');
    if (usuario && usuario.status === false)
      throw new UnauthorizedException('Usuário desativado.');
    if (process.env.ENVIRONMENT == 'local')
      if (usuario) return usuario;
    const client: LdapClient = new LdapClient({
      url: process.env.LDAP_SERVER,
    });
    try {
      await client.bind(`${login}${process.env.LDAP_DOMAIN}`, senha);
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Credenciais incorretas.');
    }
    await client.unbind();
    return usuario;
  }
}
