import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
} from '@nestjs/common'
import { CatalogService } from 'src/catalog/catalog.service'
import { getAllProductDto } from './dto/get-all.rpoduct.dto'
import { productDto } from './dto/product.dto'
import { ProductService } from './product.service'

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly catalogService: CatalogService,
  ) {}

  @Get('')
  getAtll(@Query() dto: getAllProductDto) {
    return this.productService.getAll(dto);
  }

  @Get('by-id/:id')
  byId(@Param('id') id: number) {
    return this.productService.byId(+id);
  }

  @Get('by-slug/:slug')
  bySlug(@Param('slug') slug: string) {
    return this.productService.bySlug(slug);
  }

  @Put('update/:id')
  update(@Param() id: number, @Body() dto: productDto) {
    return this.productService.update(id, dto);
  }

  @Get('similar/:id')
  getSimilar(@Param('id') id: number) {
    return this.productService.getSimilar(id);
  }
  @Delete('delete/:id')
  delete(@Param('id') id: number) {
    return this.productService.delete(id);
  }

  @Get('category')
  cagtegory() {
    return this.catalogService.getAll();
  }
}
