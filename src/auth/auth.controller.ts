import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/auth.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('')
  getAll() {
    return this.authService.getUserAll();
  }

  @Post('register')
  register(@Body() authDto: CreateAuthDto) {
    return this.authService.register(authDto);
  }
  @Post('login')
  login(@Body() authDto: CreateAuthDto) {
    return this.authService.login(authDto);
  }

  @Post('tokens')
  getNewTokens(@Body() dto: RefreshTokenDto) {
    return this.authService.getNewTokens(dto);
  }
}
