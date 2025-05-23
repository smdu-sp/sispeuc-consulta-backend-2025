import { Global, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/main/client';

@Global()
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}  