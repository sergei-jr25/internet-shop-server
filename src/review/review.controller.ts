import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CurrentUser } from 'src/user/user.decorator';
import { reviewDto } from './dto/review.dto';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  @Get('')
  getAll() {
    return this.reviewService.getAll();
  }
  @Post('')
  create(
    @Body() dto: reviewDto,
    @Param('productId') productId: number,
    @CurrentUser('id') id: number,
  ) {
    return this.reviewService.getAll();
  }
}
