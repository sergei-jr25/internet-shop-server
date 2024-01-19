import { faker } from '@faker-js/faker';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { compare, genSalt, hash } from 'bcryptjs';
import { PrismaService } from 'src/prisma.service';
import { CreateAuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService extends PrismaClient {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {
    super();
  }

  async register(dto: CreateAuthDto) {
    const userExist = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (userExist) {
      throw new HttpException('User already exsist', HttpStatus.CONFLICT);
    }
    const salt = await genSalt(10);
    const password = await hash(dto.password, salt);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password,
        isAdmin: false,
        name: faker.person.firstName(),
        avatarPath: faker.image.avatar(),
      },
      select: { id: true, email: true },
    });

    const tokens = await this.issueAccessToken(user.id);

    return {
      tokens: { ...tokens },
      id: user.id,
      email: user.email,
    };
  }

  async login(dto: CreateAuthDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    console.log(user);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Wrong email or password');
    }

    const tokens = await this.issueAccessToken(user.id);

    return {
      tokens: { ...tokens },
      id: user.id,
      email: user.email,
    };
  }

  async getUserAll() {
    return await this.prisma.user.findMany();
  }

  async issueAccessToken(userId: number) {
    const data = {
      id: userId,
    };

    const accessToken = await this.jwtService.signAsync(data, {
      expiresIn: '31d',
    });
    const refreshToken = await this.jwtService.signAsync(data, {
      expiresIn: '1h',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async getNewTokens({ refreshToken }: { refreshToken: string }) {
    if (!refreshToken) throw new UnauthorizedException('Please sign in');

    const result = await this.jwtService.verifyAsync(refreshToken);

    if (!result) throw new UnauthorizedException('Invalid token or expired');

    const user = await this.prisma.user.findUnique({
      where: { id: result.id },
    });

    const tokens = await this.issueAccessToken(user.id);

    return {
      ...tokens,
      user,
    };
  }
}
