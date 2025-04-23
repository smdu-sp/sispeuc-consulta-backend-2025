import { ApiProperty } from "@nestjs/swagger";

export class UsuarioToken {
  @ApiProperty()
  access_token: string;
  @ApiProperty()
  refresh_token: string;
}
