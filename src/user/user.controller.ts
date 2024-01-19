import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateAuthDto } from 'src/auth/dto/auth.dto';
import { CurrentUser } from './user.decorator';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('update-profile')
  updateProfile(@CurrentUser('id') id: number, @Body() dto: CreateAuthDto) {
    return this.userService.updateProfile(+id, dto);
  }

  @Get('profile/:id')
  getProfile(@Param('id') id: string) {
    return this.userService.getProfile(+id);
  }

  @Put('favorites/:userId')
  isExistFavorite(@Param('userId') userId: string, @Body() { productId }: any) {
    console.log('useriD', userId, 'productId', productId);

    return this.userService.toggleFavorites(+userId, +productId);
  }
}
