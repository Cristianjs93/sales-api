import { PrismaClient } from '@prisma/client';
import { customerSeeder } from '../src/seeders/customer.seeder';
import { itemSeeder } from '../src/seeders/item.seeder';

const prisma = new PrismaClient();

async function main() {
  await prisma.customer.createMany({
    data: customerSeeder,
    skipDuplicates: true,
  });

  await prisma.item.createMany({
    data: itemSeeder,
    skipDuplicates: true,
  });
}

main()
  .then(() => {
    console.log('Seeding complete');
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
