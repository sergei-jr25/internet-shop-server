import { IsString, MaxLength, MinLength } from '@nestjs/class-validator';

export class reviewDto {
  @IsString()
  readonly text: string;

  @MaxLength(5)
  @MinLength(1)
  readonly rating: number;
}
