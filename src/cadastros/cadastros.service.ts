import { Cadastros } from './../../node_modules/@prisma/bi/client/index.d';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { BiService } from 'src/prisma/bi.service';

@Injectable()
export class CadastrosService {
  constructor(
    private bi: BiService,
    private app: AppService,
  ) {}

  async buscarTudo(
    pagina: number = 1,
    limite: number = 10,
    busca?: string,
    tipo?: string,
    sistema?: string,
  ) {
    [pagina, limite] = this.app.verificaPagina(pagina, limite);
    const searchParams = {
      SQL_Incra: { not: null },
      ...(tipo && tipo !== 'all' && { TipoSQL_Incra: tipo }),
      ...(sistema && sistema !== 'all' && { Sistema: sistema }),
      ...(busca && { OR: [
        { SQL_Incra: { startsWith: this.app.formatarSql(busca)}}
      ]}),
    };
    const total: number = await this.bi.cadastros.count({ where: searchParams });
    if (total == 0) return { total: 0, pagina: 0, limite: 0, data: [] };
    [pagina, limite] = this.app.verificaLimite(pagina, limite, total);
    const cadastros: Cadastros[] = await this.bi.cadastros.findMany({
      where: searchParams,
      orderBy: {
        Assunto: {
          DtPedidoProtocolo: 'desc',
        }
      },
      include: {
        Assunto: true
      },
      skip: (pagina - 1) * limite,
      take: limite,
    });
    return {
      total: +total,
      pagina: +pagina,
      limite: +limite,
      data: cadastros,
    };
  }

  async buscarSistemas(): Promise<{Sistema: string}[]> {
    const sistemas = await this.bi.cadastros.findMany({
      select: {
        Sistema: true
      },
      distinct: ['Sistema'],
    });
    if (!sistemas) throw new InternalServerErrorException('Não foi possível retornar a lista de sistemas!')
    return sistemas;
  }

  async buscaListaSQL(
    sqls: string[]
  ) {
    var sqls_formatados = [];

    sqls.map(sql => {
      const sql_formatado = this.app.adicionaDigitoSql(sql);
      if (!sqls_formatados.includes(sql_formatado))
        sqls_formatados.push(sql_formatado);
    });

    // const dataRelatorio = new Date();
    const cadastros = await this.bi.cadastros.findMany({
      where: {
        SQL_Incra: { in: sqls_formatados }
      },
      orderBy: {
        SQL_Incra: 'asc'
      },
      select: {
        SQL_Incra: true,
        Processo: true,
        Sistema: true,
        Assunto: {
          select: {
            Assunto: true,
            DtPedidoProtocolo: true,
            SituacaoAssunto: true,
            DtEmissaoDocumento: true
          }
        }
      }
    });

    const resposta = [];
    sqls_formatados.sort();
    sqls_formatados.map(sql => {
      var processos = cadastros.filter(cad => cad.SQL_Incra === sql);
      processos = processos.sort((a, b) => {
        const dateA = a.Assunto && a.Assunto.DtPedidoProtocolo ? a.Assunto.DtPedidoProtocolo : new Date();
        const dateB = b.Assunto && b.Assunto.DtPedidoProtocolo ? b.Assunto.DtPedidoProtocolo : new Date();
        return dateA.getTime() - dateB.getTime();
      });
      if (processos.length > 0) {
        processos.map(processo => {
          resposta.push({
            "SQL": sql,
            "Processo": processo.Processo,
            "Sistema": processo.Sistema,
            "Assunto": processo.Assunto && processo.Assunto.Assunto,
            "Situacao": processo.Assunto && processo.Assunto.SituacaoAssunto,
            "Data de Inclusão": processo.Assunto && processo.Assunto.DtPedidoProtocolo && new Date(processo.Assunto.DtPedidoProtocolo).toLocaleDateString(),
            "Data de Encerramento": processo.Assunto && processo.Assunto.DtEmissaoDocumento && new Date(processo.Assunto.DtEmissaoDocumento).toLocaleDateString()
          })
        })
      } else {
        resposta.push({
          "SQL": sql,
          "Processo": 'Nenhum processo encontrado',
        })
      }
    });

    return resposta;
  }
}
