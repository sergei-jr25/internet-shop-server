import { IsString } from '@nestjs/class-validator';

export class catalogDto {
  @IsString()
  readonly name: string;
}
