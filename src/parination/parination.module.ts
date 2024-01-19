import { Module } from '@nestjs/common';
import { ParinationController } from './parination.controller';
import { ParinationService } from './parination.service';

@Module({
  controllers: [ParinationController],
  providers: [ParinationService],
  exports: [ParinationService],
})
export class ParinationModule {}
