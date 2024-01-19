import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { userDto } from './dto/user.dto';
import { returnUserObject } from './returnUserObject';

@Injectable()
export class UserService extends PrismaClient {
  constructor(private prisma: PrismaService) {
    super();
  }

  // getProfile
  // toggleFavorites
  // updateprofile

  async updateProfile(userId: number, dto: userDto) {
    const user = await this.prisma.user.findUnique({ where: { id: +userId } });

    if (!user) throw new NotFoundException('User not fount');

    const usersWithSameEmail = await this.prisma.user.findMany({
      where: {
        email: dto.email,
        id: { not: userId }, // Исключить текущего пользователя из поиска по email
      },
    });

    if (usersWithSameEmail.length > 0) {
      return 'Email already exists';
    }

    const userUpdate = this.prisma.user.update({
      where: { id: userId },
      data: {
        email: dto.email,
        password: dto.password,
        name: dto.name,
      },
    });

    return userUpdate;
  }

  async getProfile(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { ...returnUserObject, products: true, reviews: true },
    });

    if (!user) throw new NotFoundException('User not fount');

    return user;
  }

  async toggleFavorites(userId: number, productId: number) {
    const user = await this.byId(userId);

    const isExistFavorite = user.products.some((product) => {
      return product.id === productId;
    });

    return await this.prisma.user.update({
      where: { id: user.id },
      data: {
        products: {
          [isExistFavorite ? 'disconnect' : 'connect']: {
            id: productId,
          },
        },
      },
    });
  }

  async byId(userId: number, selectObject?: Prisma.UserSelect) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        reviews: true,
        avatarPath: true,
        products: {
          select: {
            id: true,
            image: true,
            price: true,
            slug: true,
          },
        },
        orders: {
          select: {
            id: true,
            items: true,
            status: true,
            total: true,
          },
        },
        ...selectObject,
      },
    });

    return user;
  }
}

// select: {
//   id: true,
//   email: true,
//   name: true,
//   products: true,
//   reviews: true,

// },
