import { Global, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/sgu/client';

@Global()
@Injectable()
export class SguService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}