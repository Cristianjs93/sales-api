import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderStatus, SalesOrder } from '@prisma/client';
import { Prisma } from 'src/database/client';
import { SalesOrderReqDto } from 'src/dto/salesOrder.dto';
import { handleErrorResponse } from 'src/utils/handleErrorResponse';
import { CustomerService } from './customer.service';
import { ItemService } from './item.service';
import { calculateTotal } from 'src/utils/helpers';

@Injectable()
export class SalesOrderService {
  constructor(
    private prisma: Prisma,
    private customerService: CustomerService,
    private itemService: ItemService,
  ) {}

  async findOrders(): Promise<SalesOrder[]> {
    try {
      const orders = await this.prisma.salesOrder.findMany({
        include: { salesLines: true },
      });
      return orders;
    } catch (error) {
      handleErrorResponse(error, 'Error fetching orders');
    }
  }

  async createOrder(orderData: SalesOrderReqDto): Promise<SalesOrder> {
    try {
      const { customerId, items } = orderData;

      await this.customerService.findCustomerById(customerId);

      const salesLines = await Promise.all(
        items.map(async (itemDto) => {
          const { item, remainingStock, subtotal } =
            await this.itemService.validateAndGetItem(itemDto);
          return { ...itemDto, subtotal, itemId: item.id, remainingStock };
        }),
      );

      await Promise.all(
        salesLines.map((line) =>
          this.itemService.updateItemStock(line.itemId, line.remainingStock),
        ),
      );

      const total = calculateTotal(salesLines);

      return this.prisma.salesOrder.create({
        data: {
          customerId,
          total,
          status: OrderStatus.OPEN,
          salesLines: {
            create: salesLines.map(
              ({ itemId, quantity, price, discount, subtotal }) => ({
                itemId,
                quantity,
                price,
                discount,
                subtotal,
              }),
            ),
          },
        },
        include: { salesLines: true },
      });
    } catch (error) {
      handleErrorResponse(error, 'Error creating the order');
    }
  }

  async closeOrder(id: number): Promise<string> {
    try {
      await this.verifyOrderIsClosed(id);
      await this.prisma.salesOrder.update({
        where: { id },
        data: { status: OrderStatus.CLOSED },
      });
      return 'Order closed successfully';
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      handleErrorResponse(error, 'Error closing the order');
    }
  }

  async verifyOrderIsClosed(id: number): Promise<void> {
    const order = await this.prisma.salesOrder.findUniqueOrThrow({
      where: { id },
    });

    if (order.status === OrderStatus.CLOSED) {
      throw new BadRequestException('Cannot modify a closed order');
    }
  }
}
