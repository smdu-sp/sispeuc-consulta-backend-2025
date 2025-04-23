import { Global, Injectable } from '@nestjs/common';

@Global()
@Injectable()
export class AppService {
  verificaData(dataInicio: string, dataFim: string): [Date, Date] {
    let inicio: Date, fim: Date;
    if (!dataInicio) inicio = new Date();
    else {
      var dataSeparada = dataInicio.split('-');
      inicio = new Date(
        +dataSeparada[2],
        +dataSeparada[1] - 1,
        +dataSeparada[0],
        0, 0, 0
      )
    }
    if (!dataFim) fim = new Date();
    else {
      var dataSeparada = dataFim.split('-');
      fim = new Date(
        +dataSeparada[2],
        +dataSeparada[1] - 1,
        +dataSeparada[0],
        23, 59, 59, 999
      )
    }
    return [inicio, fim];
  }
  verificaPagina(pagina: number, limite: number) {
    if (!pagina) pagina = 1;
    if (!limite) limite = 10;
    if (pagina < 1) pagina = 1;
    if (limite < 1) limite = 10;
    return [pagina, limite];
  }

  verificaLimite(pagina: number, limite: number, total: number) {
    if ((pagina - 1) * limite >= total) pagina = Math.ceil(total / limite);
    return [pagina, limite];
  }

  formatarSql(value: string): string {
    //111.111.1111-1
    if (!value) return value;
    const onlyNumbers = value && value.toString().replace(/\D/g, '').substring(0, 11);
    if (onlyNumbers.length <= 3){
      return onlyNumbers.replace(/(\d{0,3})/, '$1');
    }
    if (onlyNumbers.length <= 6){
      return onlyNumbers.replace(/(\d{0,3})(\d{0,3})/, '$1.$2');
    }
    if (onlyNumbers.length <= 10){
      return onlyNumbers.replace(/(\d{0,3})(\d{0,3})(\d{0,4})/, '$1.$2.$3');
    }
    return onlyNumbers.replace(/(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,1})/, '$1.$2.$3-$4');
  }

  adicionaDigitoSql(sqlNumero: string): string {
      sqlNumero = sqlNumero && sqlNumero.toString().replace(/\D/g, '').substring(0, 11);
      var soma = 0;
      const verificador = [1, 10, 9, 8, 7, 6, 5, 4, 3, 2];
      for (let i = 0; i < 10; i++) soma += parseInt(sqlNumero.toString()[i]) * verificador[i];
      soma = soma % 11;
      if (soma === 10) soma = 1;
      if (soma > 1 && soma < 10) soma = 11 - soma;
      return this.formatarSql(sqlNumero.toString() + soma.toString());
  }

  formatarSqlCondominio(value: string): string {
    //1111111111-1
    if (!value) return value;
    const onlyNumbers = value && value.toString().replace(/\D/g, '').substring(0, 11);
    if (onlyNumbers.length <= 10)
        return onlyNumbers.replace(/(\d{0,10})/, '$1');
    return onlyNumbers.replace(/(\d{0,10})(\d{0,1})/, '$1-$2');
  }
}
