import { faker } from '@faker-js/faker';
import { PrismaClient, Product } from '@prisma/client';

const prisma = new PrismaClient();

async function createProducts(quantity: number) {
  const productsToCreate = 20;
  const products: Product[] = [];

  for (let i = 0; i < quantity; i++) {
    const product = await prisma.product.create({
      data: {
        name: faker.commerce.productName(),

        slug: faker.lorem.slug(),
        description: faker.lorem.sentence(),
        image: Array.from({ length: quantity }).map(() => faker.image.url()),
        isExsist: faker.datatype.boolean(),
        // userId: faker.helpers.arrayElement(createdUsers).id,
        // categoryId: faker.helpers.arrayElement(createdCategories).id,
        price: +faker.commerce.price({ min: 100, max: 200, dec: 0 }),

        category: {
          create: {
            name: faker.commerce.department(),
            slug: faker.lorem.slug(),
          },
        },
        reviews: {
          create: [
            {
              rating: parseInt(faker.number.binary({ min: 1, max: 5 })),
              text: faker.lorem.sentence(),
              user: {
                connect: {
                  id: 1,
                },
              },
            },
            {
              rating: parseInt(faker.number.binary({ min: 1, max: 5 })),
              text: faker.lorem.sentence(),
              user: {
                connect: {
                  id: 1,
                },
              },
            },
          ],
        },
      },
    });

    products.push(product);
  }
}

async function main() {
  console.log('Start seddeng ...');
  await createProducts(10);
}

main()
  .catch((e) => console.log(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
