import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginDto {
    @ApiProperty()
    @IsString()
    login: string;
    @ApiProperty()
    @IsString()
    senha: string;
}
