import { Injectable } from '@nestjs/common';
import { paginationDto } from './dto/pagunation.dto';

@Injectable()
export class ParinationService {
  getPagenation(dto: paginationDto, defaultPage: number = 20) {
    const page = dto.page ? +dto.page : 1;
    const perPage = dto.perPage ? +dto.perPage : defaultPage;
    const skip = (page - 1) * perPage;

    return { perPage, skip };
  }
}
