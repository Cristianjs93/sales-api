import { Module } from '@nestjs/common';
import { SalesOrderController } from 'src/controllers/salesOrder.controller';
import { SalesOrderService } from 'src/services/salesOrder.service';
import { Prisma } from 'src/database/client';
import { CustomerModule } from './customer.module';
import { ItemModule } from './item.module';

@Module({
  controllers: [SalesOrderController],
  providers: [SalesOrderService, Prisma],
  imports: [CustomerModule, ItemModule],
})
export class SalesOrderModule {}
