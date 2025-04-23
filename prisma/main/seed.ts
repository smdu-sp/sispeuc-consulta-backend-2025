import { PrismaClient } from '@prisma/main/client';

const prisma = new PrismaClient();

async function main() {
  const usuario = await prisma.usuario.upsert({
    where: { login: 'd927014' },
    update: {
      nome: 'Victor Alexander Menezes de Abreu',
      email: 'vmabreu@prefeitura.sp.gov.br',
      permissao: 'DEV',
      status: true,
    },
    create: {
      nome: 'Victor Alexander Menezes de Abreu',
      login: 'd927014',
      email: 'vmabreu@prefeitura.sp.gov.br',
      permissao: 'DEV',
      status: true,
    }
  });

  console.log(usuario);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
