import { Injectable } from '@nestjs/common';
import { OrderItem } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { orderItemDto } from './dto/prisma-item.dto';

@Injectable()
export class OrderItemService {
  constructor(readonly prisma: PrismaService) {}

  async createOrderItem(dto: orderItemDto): Promise<OrderItem> {
    const { orderId, price, productId, quantity } = dto;
    return this.prisma.orderItem.create({
      data: {
        orderId,
        productId,
        quantity,
        price,
      },
    });
  }

  async getAllOrderItemsByOrderId(orderId: number): Promise<OrderItem[]> {
    return this.prisma.orderItem.findMany({
      where: {
        orderId,
      },
    });
  }
}
