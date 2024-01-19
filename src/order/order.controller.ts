import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { orderDto } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  getAll() {
    return this.orderService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.orderService.getById(+id);
  }

  @Post('create/:id')
  updateOrder(@Body() dto: orderDto, @Param('id') id: string) {
    return this.orderService.createOrder(dto, +id);
  }

  // @Post('')
  // createOrder(@Param('id') id: string, @Body() status: string) {
  //   return this.orderService.createOrder(+id, status);
  // }

  // @Get('')
  // getAll() {
  //   return this.orderService.getAllOrders();
  // }

  // @Get('id')
  // getOrderById(@Param('id') id: string) {
  //   return this.orderService.getOrderById(+id);
  // }
}
