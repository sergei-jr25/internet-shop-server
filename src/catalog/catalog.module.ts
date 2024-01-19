import { Module } from '@nestjs/common';
import { ParinationService } from 'src/parination/parination.service';
import { PrismaService } from 'src/prisma.service';
import { ProductService } from 'src/product/product.service';
import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';

@Module({
  controllers: [CatalogController],
  providers: [CatalogService, PrismaService, ParinationService, ProductService],
  exports: [CatalogService],
})
export class CatalogModule {}
