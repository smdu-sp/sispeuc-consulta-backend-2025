import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { SguService } from './sgu.service';
import { BiService } from './bi.service';

@Global()
@Module({
  providers: [PrismaService, SguService, BiService],
  exports: [PrismaService, SguService, BiService],
})
export class PrismaModule {}
