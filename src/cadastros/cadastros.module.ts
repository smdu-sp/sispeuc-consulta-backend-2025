import { Module } from '@nestjs/common';
import { CadastrosService } from './cadastros.service';
import { CadastrosController } from './cadastros.controller';

@Module({
  controllers: [CadastrosController],
  providers: [CadastrosService],
})
export class CadastrosModule {}
