import { Controller, Get } from '@nestjs/common';
import { SalesOrder } from '@prisma/client';
import { SalesOrderService } from 'src/services/salesOrder.service';

@Controller('sales-orders')
export class SalesOrderController {
  constructor(private readonly salesOrderService: SalesOrderService) {}

  @Get(':id')
  async findOrders(): Promise<SalesOrder[]> {
    try {
      const response = await this.salesOrderService.findOrders();
      return response;
    } catch (error) {
      throw error;
    }
  }
}
