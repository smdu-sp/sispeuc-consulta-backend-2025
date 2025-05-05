import { IsPublic } from './../auth/decorators/is-public.decorator';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus, HttpCode } from '@nestjs/common';
import { CadastrosService } from './cadastros.service';

@Controller('cadastros')
export class CadastrosController {
  constructor(private readonly cadastrosService: CadastrosService) {}

  @Get('buscar-tudo')
  buscarTudo(
    @Query('pagina')  pagina?: string,
    @Query('limite')  limite?: string,
    @Query('busca')   busca?: string,
    @Query('tipo')    tipo?: string,
    @Query('sistema') sistema?: string
  ) {
    return this.cadastrosService.buscarTudo(+pagina, +limite, busca, tipo, sistema);
  }

  @Get('buscar-sistemas')
  buscarSistemas() {
    return this.cadastrosService.buscarSistemas();
  }

  @IsPublic()
  @Post('buscar-lista')
  @HttpCode(200)
  buscarPorSql(
    @Body() body: { listaSql: string[] }
  ) {
    return this.cadastrosService.buscaListaSQL(body.listaSql);
  }
}
