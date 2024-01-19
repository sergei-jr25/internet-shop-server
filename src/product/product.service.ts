import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { returnCatalogObject } from 'src/catalog/return-catalog.object'
import { ParinationService } from 'src/parination/parination.service'
import { PrismaService } from 'src/prisma.service'
import { convertToNumber } from 'src/utils/convertToNumber'
import { EnumProductSort, getAllProductDto } from './dto/get-all.rpoduct.dto'
import { productDto } from './dto/product.dto'
import { returnProductObjectFullest } from './return-product.object'

@Injectable()
export class ProductService {
  constructor(
    readonly prisma: PrismaService,
    readonly paginatiService: ParinationService,
  ) {}

  async getEmptyAll() {
    const product = await this.prisma.category.findMany({
      select: returnCatalogObject,
    });

    return product;
  }

  async getAll(dto: getAllProductDto) {
    const { searchTerm, sort, maxPrice, minPrice, ratings } = dto;

    const prismaSort: Prisma.ProductOrderByWithRelationInput[] = [];

    if (sort === EnumProductSort.HIGHT_PRICE) {
      prismaSort.push({ price: 'desc' });
    } else if (sort === EnumProductSort.LOW_PRICE) {
      prismaSort.push({ price: 'asc' });
    } else if (sort === EnumProductSort.OLSEST) {
      prismaSort.push({ createdAt: 'asc' });
    } else if (sort === EnumProductSort.NEWEST) {
      prismaSort.push({ createdAt: 'desc' });
    }

    const prismaSearchFilter: Prisma.ProductWhereInput = searchTerm
      ? {
          OR: [
            {
              category: {
                name: {
                  contains: searchTerm,
                  mode: 'insensitive',
                },
              },
            },

            {
              name: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
            {
              description: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
          ],
        }
      : {};

    const filters = this.createFilters(dto);

    const { perPage, skip } = this.paginatiService.getPagenation(dto);

    const products = await this.prisma.product.findMany({
      where: filters,
      orderBy: this.getOpitons(dto.sort),
      skip,
      take: perPage,
    });
    return {
      products,
      length: await this.prisma.product.count({ where: filters }),
    };
  }

  private getPriceFilter(
    minPrice?: number,
    maxPrice?: number,
  ): Prisma.ProductWhereInput {
    let priceFilter: any;

    if (minPrice) {
      priceFilter = {
        ...priceFilter,
        gte: minPrice,
      };
    }
    if (maxPrice) {
      priceFilter = {
        ...priceFilter,
        lte: maxPrice,
      };
    }

    return {
      price: priceFilter,
    };
  }

  private getRattingFilter(ratigns?: number[]): Prisma.ProductWhereInput {
    return {
      reviews: {
        some: {
          rating: {
            in: ratigns,
          },
        },
      },
    };
  }

  private getSearhTerm(searchTerm?: string): Prisma.ProductWhereInput {
    return searchTerm
      ? {
          OR: [
            {
              category: {
                name: {
                  contains: searchTerm,
                  mode: 'insensitive',
                },
              },
            },

            {
              name: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
            {
              description: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
          ],
        }
      : {};
  }

  private getOpitons(
    sort: EnumProductSort,
  ): Prisma.ProductOrderByWithRelationInput[] {
    const prismaSort: Prisma.ProductOrderByWithRelationInput[] = [];
    if (sort === EnumProductSort.HIGHT_PRICE) {
      prismaSort.push({ price: 'desc' });
    } else if (sort === EnumProductSort.LOW_PRICE) {
      prismaSort.push({ price: 'asc' });
    } else if (sort === EnumProductSort.OLSEST) {
      prismaSort.push({ price: 'asc' });
    } else if (sort === EnumProductSort.NEWEST) {
      prismaSort.push({ price: 'desc' });
    }

    return prismaSort;
  }

  private getCategory(categoryId: number): Prisma.ProductWhereInput {
    return {
      categoryId: categoryId,
    };
  }

  private createFilters(dto: getAllProductDto) {
    const filters: Prisma.ProductWhereInput[] = [];
    if (dto.searchTerm) filters.push(this.getSearhTerm(dto.searchTerm));

    console.log(dto.ratings);

    if (dto.ratings)
      filters.push(
        this.getRattingFilter(dto.ratings.split('|').map((rating) => +rating)),
      );

    if (dto.maxPrice || dto.minPrice)
      filters.push(
        this.getPriceFilter(
          convertToNumber(dto.minPrice),
          convertToNumber(dto.maxPrice),
        ),
      );

    if (dto.category) {
      filters.push(this.getCategory(+dto.category));
    }

    return filters.length ? { AND: filters } : {};
  }

  async category() {
    const category = await this.prisma.category.findMany();

    if (!category) {
      throw new NotFoundException('Product not found');
    }

    return category;
  }
  async byId(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      select: returnProductObjectFullest,
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async bySlug(categorySlug: string) {
    const product = await this.prisma.product.findFirst({
      where: {
        category: {
          slug: categorySlug,
        },
      },
      select: returnProductObjectFullest,
    });

    if (!product) {
      throw new NotFoundException('Products not found');
    }

    return product;
  }

  async getSimilar(id: number) {
    const currentPoduct = await this.byId(id);

    if (!currentPoduct) {
      throw new NotFoundException('currentPoduct not found');
    }

    const products = await this.prisma.product.findMany({
      where: {
        category: {
          name: currentPoduct.name,
        },
        NOT: {
          id: currentPoduct.id,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: returnProductObjectFullest,
    });

    return products;
  }

  async update(id: number, dto: productDto) {
    const {
      description,
      categoryId,
      image,
      isExsist,
      name,
      slug,
      price,
    }: productDto = dto;
    await this.prisma.category.findUnique({ where: { id: categoryId } });
    const product = await this.prisma.product.update({
      where: { id },
      data: {
        description,
        image,
        price,
        name,
        slug,
        isExsist,
        category: {
          connect: {
            id: categoryId,
          },
        },
      },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async delete(id: number) {
    const product = await this.prisma.product.delete({ where: { id } });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return true;
  }
}
