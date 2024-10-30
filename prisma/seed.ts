import { PrismaClient } from '@prisma/client';
import { customerSeeder } from '../src/seeders/customer.seeder';
import { itemSeeder } from '../src/seeders/item.seeder';
import { salesOrderSeeder } from '../src/seeders/salesOrder.seeder';

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

  for (const order of salesOrderSeeder) {
    const salesOrder = await prisma.salesOrder.create({
      data: {
        customerId: order.customerId,
        status: order.status,
        total: order.total,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      },
    });

    const salesLines = order.salesLines.map((line) => ({
      salesOrderId: salesOrder.id,
      itemId: line.itemId,
      quantity: line.quantity,
      price: line.price,
      discount: line.discount,
      subtotal: line.subtotal,
    }));

    await prisma.orderLine.createMany({
      data: salesLines,
    });
  }
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
