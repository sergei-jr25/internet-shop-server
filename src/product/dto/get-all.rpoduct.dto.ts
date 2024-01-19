import { IsEnum, IsOptional, IsString } from '@nestjs/class-validator';
import { paginationDto } from 'src/parination/dto/pagunation.dto';

export enum EnumProductSort {
  HIGHT_PRICE = 'high-price',
  LOW_PRICE = 'low_price',
  NEWEST = 'newes',
  OLSEST = 'oldest',
}

export class getAllProductDto extends paginationDto {
  @IsOptional()
  @IsEnum(EnumProductSort)
  sort?: EnumProductSort;

  @IsOptional()
  @IsString()
  searchTerm?: string;
  @IsOptional()
  @IsString()
  minPrice?: number;

  @IsOptional()
  @IsString()
  maxPrice?: number;

  @IsOptional()
  @IsString()
  ratings?: string;

  category: string;
}
