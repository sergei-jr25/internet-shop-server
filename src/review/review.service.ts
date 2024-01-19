import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { reviewDto } from './dto/review.dto';
import { returnViewObject } from './return-view.object';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const reviews = await this.prisma.reviews.findMany({
      select: returnViewObject,
    });

    return reviews;
  }

  async create(userId: number, productId: number, dto: reviewDto) {
    const reviews = await this.prisma.reviews.create({
      data: {
        ...dto,
        user: { connect: { id: userId } },
        product: {
          connect: { id: productId },
        },
      },
    });

    return reviews;
  }

  async getAverageValueProductId(productId: number) {
    const averageValue = await this.prisma.reviews
      .aggregate({
        _avg: { rating: true },
        where: { id: productId },
      })
      .then((data) => data._avg);
  }
}
