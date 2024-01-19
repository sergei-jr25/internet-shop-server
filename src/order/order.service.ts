import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { returnProductObject } from 'src/product/return-product.object';
import { UserService } from 'src/user/user.service';
import { orderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    readonly prisma: PrismaService,
    readonly userSerive: UserService,
  ) {}

  async getById(userId: number) {
    return this.prisma.order.findMany({
      where: { UserId: userId },
      orderBy: { createdAt: 'desc' },
      include: {
        items: {
          include: {
            Product: {
              select: returnProductObject,
            },
          },
        },
      },
    });
  }
  async getAll() {
    return this.prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        items: {
          include: {
            Product: {
              select: returnProductObject,
            },
          },
        },
      },
    });
  }

  async createOrder(dto: orderDto, userId: number) {
    const order = await this.prisma.order.create({
      data: {
        status: dto.status,
        total: 1000,
        items: {
          create: dto.items,
        },
        user: {
          connect: { id: userId },
        },
      },
    });

    return order;
  }

  // async createOrder(productId: number) {
  //   const orderItems = await this.prisma.orderItem.findMany({
  //     where: {
  //       orderId: null, // Замените null на актуальный фильтр, если это необходимо
  //     },
  //   });
  //   const order = await this.prisma.order.findUnique({
  //     where: { id: order.id },
  //     include: { items: true, user: true },
  //   });

  //   const isExistFavorite = order?.items?.some((product) => {
  //     return product.id === productId;
  //   });

  //   const total = orderItems.reduce(
  //     (acc, item) => acc + item.quantity * item.price,
  //     0,
  //   );

  //   return await this.prisma.order.create({
  //     data: {
  //       total,
  //       status: 'pending',
  //       items: {
  //         [isExistFavorite ? 'disconnect' : 'connect']: {
  //           id: productId,
  //         },
  //       },
  //     },
  //   });
  // }

  // async createOrder(userId: any, status: string): Promise<Order> {
  //   const orderItems = await this.prisma.orderItem.findMany({
  //     where: {
  //       orderId: null, // Замените null на актуальный фильтр, если это необходимо
  //     },
  //   });

  //   const total = orderItems.reduce(
  //     (acc, item) => acc + item.quantity * item.price,
  //     0,
  //   );

  //   return this.prisma.order.create({
  //     data: {
  //       status,
  //       total,
  //       user: { connect: { id: userId } },
  //     },
  //   });
  // }

  // async getAllOrders(): Promise<Order[]> {
  //   return this.prisma.order.findMany();
  // }

  // async getOrderById(orderId: number): Promise<Order | null> {
  //   return this.prisma.order.findUnique({
  //     where: {
  //       id: orderId,
  //     },
  //   });
  // }

  // async updateOrderTotalAndStatus(
  //   orderId: number,
  //   status: string,
  // ): Promise<Order> {
  //   const orderItems = await this.prisma.orderItem.findMany({
  //     where: {
  //       orderId: orderId,
  //     },
  //   });

  //   const total = orderItems.reduce(
  //     (acc, item) => acc + item.quantity * item.price,
  //     0,
  //   );
  //   return this.prisma.order.update({
  //     where: {
  //       id: orderId,
  //     },
  //     data: {
  //       total,
  //       status,
  //     },
  //   });
  // }
}
