import { IsArray, IsNumber } from '@nestjs/class-validator';

export class orderDto {
  status: string;

  @IsArray()
  items: OrderDtoItems[];
}

class OrderDtoItems {
  @IsNumber()
  quantity: number;
  @IsNumber()
  price: number;
  @IsNumber()
  productId: number;
}
