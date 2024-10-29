import { Injectable } from '@nestjs/common';
import { SalesOrder } from '@prisma/client';
import { Prisma } from 'src/database/client';
import { handleErrorResponse } from 'src/utils/handleErrorResponse';

@Injectable()
export class SalesOrderService {
  constructor(private prisma: Prisma) {}

  async findOrders(): Promise<SalesOrder[]> {
    try {
      const orders = await this.prisma.salesOrder.findMany({});
      return orders;
    } catch (error) {
      handleErrorResponse(error, 'Error fetching orders');
    }
  }
}
