import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { orderItemDto } from './dto/prisma-item.dto';
import { OrderItemService } from './order-item.service';

@Controller('order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post()
  createOrderItem(@Param('id') id: number, @Body() dto: orderItemDto) {
    return this.orderItemService.createOrderItem(dto);
  }

  @Get()
  getAllOrderItemsByOrderId(@Param() id: number) {
    return this.getAllOrderItemsByOrderId(id);
  }
}
