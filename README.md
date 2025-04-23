<p align="center">
  <a href="https://www.prefeitura.sp.gov.br/cidade/secretarias/licenciamento/" target="blank"><img src="https://www.prefeitura.sp.gov.br/cidade/secretarias/upload/chamadas/URBANISMO_E_LICENCIAMENTO_HORIZONTAL_FUNDO_CLARO_1665756993.png" width="200" alt="SMUL Logo" /></a>
</p>
<p align="center">Base de desenvolvimento Backend - SMUL/ATIC</p>

## Tecnologias

<p align="left">
  <a href="https://docs.nestjs.com/" target="_blank" title="Nestjs" style="text-decoration: none; decoration: none;">
    <img src="https://docs.nestjs.com/assets/logo-small-gradient.svg" alt="Nestjs" width="40" height="40" style="border-radius: 50%;" />
  </a>
  <a href="https://www.prisma.io/docs" target="_blank" title="Prisma.io" style="text-decoration: none; decoration: none;">
    <img src="https://www.prisma.io/docs/img/logo-white.svg" alt="Prisma.io" width="40" height="40" style="border-radius: 50%;" />
  </a>
</p>


## Instalação

```bash
npm install
# ou
yarn install
# ou
pnpm install
# ou
bun install
```

## Criando o arquivo .env

```bash
copy example.env .env
```

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copie o código gerado para o campo JWT_SECRET no arquivo .env

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copie o código gerado para o campo RT_SECRET no arquivo .env

## Rodando a aplicação

Por padrão, a aplicação rodará na porta 3000.

```bash
# atualiza a cada mudança nos arquivos
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

```bash
# modo de desenvolvimento
npm run start
# ou
yarn start
# ou
pnpm start
# ou
bun start
```

[http://localhost:3000](http://localhost:3000)