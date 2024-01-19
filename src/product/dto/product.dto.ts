import {
  ArrayMinSize,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from '@nestjs/class-validator';

export class productDto {
  @IsString()
  slug: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString({ each: true })
  @ArrayMinSize(1)
  image: string[];

  @IsBoolean()
  isExsist: boolean;

  @IsNumber()
  categoryId: number;

  @IsNumber()
  price: number;
}
