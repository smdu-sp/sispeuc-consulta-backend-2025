import { Global, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/bi/client';

@Global()
@Injectable()
export class BiService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}