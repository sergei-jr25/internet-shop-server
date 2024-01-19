import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProductService } from 'src/product/product.service';
import { catalogDto } from './dto/catallog.dto';
import { returnCatalogObject } from './return-catalog.object';

@Injectable()
export class CatalogService {
  constructor(
    readonly prisma: PrismaService,
    readonly productService: ProductService,
  ) {}

  // getProfile
  // toggleFavorites
  // updateprofile

  async getProducts() {
    console.log('Before query');

    const products = await this.productService.getEmptyAll();
    return products;
  }
  async getAll() {
    console.log('Before query');

    const categorys = await this.prisma.category.findMany();
    return categorys;
  }

  async byId(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      select: returnCatalogObject,
    });

    console.log(category);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async bySlug(slug: string) {
    const category = await this.prisma.category.findFirst({
      where: { slug },
      select: returnCatalogObject,
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async create() {
    const user = await this.prisma.category.create({
      data: {
        name: '',
        slug: '',
      },
    });
    return user;
  }

  async updateCategory(id: number, dto: catalogDto) {
    const category = await this.prisma.category.findUnique({ where: { id } });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const newCategory = this.prisma.category.update({
      where: { id },
      data: {
        name: dto.name,
        slug: dto.name,
      },
    });

    return newCategory;
  }

  async deleteCategory(id: number) {
    const category = await this.prisma.category.delete({ where: { id } });

    return true;
  }
}
