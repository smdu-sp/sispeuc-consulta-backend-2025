import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginRequestBody {
  @ApiProperty()
  @IsString({ message: 'O login precisa ser um texto.' })
  login: string;

  @ApiProperty()
  @IsString({ message: 'A senha precisa ser um texto.' })
  senha: string;
}
