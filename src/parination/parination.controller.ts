import { Controller } from '@nestjs/common';
import { ParinationService } from './parination.service';

@Controller('parination')
export class ParinationController {
  constructor(private readonly parinationService: ParinationService) {}
}
