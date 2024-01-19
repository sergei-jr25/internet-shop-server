import { IsEmail, IsOptional, IsString } from '@nestjs/class-validator';

export class userDto {
  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsString()
  readonly password?: string;

  @IsOptional()
  @IsString()
  readonly avatarPath?: string;
  @IsOptional()
  @IsString()
  readonly name?: string;
}
