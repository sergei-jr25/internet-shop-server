import { Controller, Get, Param } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('main/:id')
  getMain(@Param() id: string) {
    console.log(id);

    return this.statisticsService.getMain(+id);
  }

  @Get()
  totalAmount() {
    return this.statisticsService.totalAmount();
  }
}
