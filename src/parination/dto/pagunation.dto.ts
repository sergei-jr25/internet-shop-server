import { IsOptional, IsString } from '@nestjs/class-validator';

export class paginationDto {
  @IsOptional()
  @IsString()
  page?: string;

  @IsOptional()
  @IsString()
  perPage?: string;
}
