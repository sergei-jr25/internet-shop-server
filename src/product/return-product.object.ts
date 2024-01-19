import { Prisma } from '@prisma/client';
import { returnCatalogObject } from 'src/catalog/return-catalog.object';
import { returnViewObject } from 'src/review/return-view.object';

export const returnProductObject: Prisma.ProductSelect = {
  image: true,
  description: true,
  createdAt: true,
  name: true,
  price: true,
  slug: true,
  id: true,
  orderItem: {
    select: {
      price: true,
      quantity: true,
    },
  },
};

export const returnProductObjectFullest: Prisma.ProductSelect = {
  ...returnProductObject,
  reviews: {
    select: returnViewObject,
  },
  category: {
    select: returnCatalogObject,
  },
};
