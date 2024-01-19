import { Prisma } from '@prisma/client';
import { returnProductObject } from 'src/product/return-product.object';

export const returnCatalogObject: Prisma.CategorySelect = {
  id: true,
  name: true,
  slug: true,
  products: {
    select: { ...returnProductObject },
  },
};
