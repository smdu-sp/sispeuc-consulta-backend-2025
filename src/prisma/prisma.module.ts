import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { SguService } from './sgu.service';

@Global()
@Module({
  providers: [PrismaService, SguService],
  exports: [PrismaService, SguService],
})
export class PrismaModule {}
