import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SalesOrder } from '@prisma/client';
import { SalesOrderReqDto, SalesOrderResDto } from 'src/dto/salesOrder.dto';
import { SalesOrderService } from 'src/services/salesOrder.service';

@Controller('sales-orders')
@ApiTags('Orders')
export class SalesOrderController {
  constructor(private readonly salesOrderService: SalesOrderService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all orders',
  })
  @ApiOkResponse({
    description: 'Orders listed successfully',
    type: [SalesOrderResDto],
  })
  async findOrders(): Promise<SalesOrder[]> {
    try {
      const response = await this.salesOrderService.findOrders();
      return response;
    } catch (error) {
      throw error;
    }
  }

  @Post()
  @ApiOperation({
    summary: 'Creates a new order',
  })
  @ApiCreatedResponse({
    description: 'Order created successfully',
    type: [SalesOrderResDto],
  })
  async createOrder(@Body() body: SalesOrderReqDto): Promise<SalesOrder> {
    try {
      const response = await this.salesOrderService.createOrder(body);
      return response;
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id/close')
  @ApiOperation({
    summary: 'Update the status of an order',
  })
  @ApiCreatedResponse({
    description: 'Order created successfully',
    example: 'Order closed successfully',
  })
  async closeOrder(@Param('id') id: string): Promise<string> {
    try {
      const response = await this.salesOrderService.closeOrder(Number(id));
      return response;
    } catch (error) {
      throw error;
    }
  }
}
