import { Module } from '@nestjs/common';
import { CatalogService } from 'src/catalog/catalog.service';
import { ParinationService } from 'src/parination/parination.service';
import { PrismaService } from 'src/prisma.service';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService, ParinationService, CatalogService],
  exports: [ProductService],
})
export class ProductModule {}
