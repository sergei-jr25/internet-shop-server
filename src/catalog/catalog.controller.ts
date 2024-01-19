import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from 'src/product/product.service';
import { CatalogService } from './catalog.service';
import { catalogDto } from './dto/catallog.dto';

@Controller('catalog')
export class CatalogController {
  constructor(
    private readonly catalogService: CatalogService,
    private readonly productService: ProductService,
  ) {}

  @Get('')
  getAll() {
    return this.catalogService.getAll();
  }
  @Get('product')
  getProduct() {
    return this.productService.getEmptyAll();
  }

  @Get(':id')
  byId(@Param('id') id: string) {
    console.log(id);

    return this.catalogService.byId(+id);
  }
  @Get('by-slug/:slug')
  bySlug(@Param('slug') slug: string) {
    return this.catalogService.bySlug(slug);
  }

  @Post('')
  create() {
    return this.catalogService.create();
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() dto: catalogDto) {
    return this.catalogService.updateCategory(+id, dto);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.catalogService.deleteCategory(+id);
  }
}
