import { OrderStatus } from '@prisma/client';

export const salesOrderSeeder = [
  {
    id: 1,
    customerId: 1,
    status: OrderStatus.OPEN,
    total: 5000,
    createdAt: '2024-10-30T01:48:43.936Z',
    updatedAt: '2024-10-30T01:48:43.936Z',
    salesLines: [
      {
        id: 1,
        salesOrderId: 1,
        itemId: 1,
        quantity: 2,
        price: 1200,
        discount: 0,
        subtotal: 2400,
      },
      {
        id: 2,
        salesOrderId: 1,
        itemId: 2,
        quantity: 2,
        price: 800,
        discount: 0,
        subtotal: 1600,
      },
      {
        id: 3,
        salesOrderId: 1,
        itemId: 3,
        quantity: 2,
        price: 500,
        discount: 0,
        subtotal: 1000,
      },
    ],
  },
  {
    id: 2,
    customerId: 2,
    status: OrderStatus.OPEN,
    total: 1009.5,
    createdAt: '2024-10-30T01:50:51.152Z',
    updatedAt: '2024-10-30T01:50:51.152Z',
    salesLines: [
      {
        id: 4,
        salesOrderId: 2,
        itemId: 4,
        quantity: 3,
        price: 150,
        discount: 5,
        subtotal: 427.5,
      },
      {
        id: 5,
        salesOrderId: 2,
        itemId: 5,
        quantity: 2,
        price: 300,
        discount: 3,
        subtotal: 582,
      },
    ],
  },
  {
    id: 3,
    customerId: 3,
    status: OrderStatus.OPEN,
    total: 1730.6,
    createdAt: '2024-10-30T01:56:08.284Z',
    updatedAt: '2024-10-30T01:56:08.284Z',
    salesLines: [
      {
        id: 6,
        salesOrderId: 3,
        itemId: 7,
        quantity: 4,
        price: 25,
        discount: 5,
        subtotal: 95,
      },
      {
        id: 7,
        salesOrderId: 3,
        itemId: 8,
        quantity: 5,
        price: 200,
        discount: 7,
        subtotal: 930,
      },
      {
        id: 8,
        salesOrderId: 3,
        itemId: 9,
        quantity: 4,
        price: 180,
        discount: 2,
        subtotal: 705.6,
      },
    ],
  },
];