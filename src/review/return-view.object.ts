import { Prisma } from '@prisma/client';
import { returnUserObject } from 'src/user/returnUserObject';

export const returnViewObject: Prisma.ReviewsSelect = {
  user: {
    select: returnUserObject,
  },
  createdAt: true,
  text: true,
  rating: true,
  id: true,
};
