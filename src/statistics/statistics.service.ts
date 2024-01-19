import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class StatisticsService {
  constructor(
    readonly prisma: PrismaService,
    readonly userService: UserService,
  ) {}

  async getMain(userId: number) {
    console.log(userId);

    const user = await this.userService.byId(userId, {
      orders: {
        select: {
          items: {
            select: {
              price: true,
            },
          },
        },
      },
      reviews: true,
    });
  }

  async totalAmount() {
    const orderCount = await this.prisma.order.count();
    const orderProduct = await this.prisma.product.count();
    const orderReviews = await this.prisma.reviews.count();

    const totalAmount = await this.prisma.order.aggregate({
      _sum: { total: true },
    });

    return [
      {
        name: 'Orders',
        value: orderCount,
      },
      {
        name: 'Reviews',
        value: orderReviews,
      },
      {
        name: 'Favorites',
        value: orderProduct,
      },
      {
        name: 'Amount',
        value: totalAmount,
      },
    ];
  }
}
