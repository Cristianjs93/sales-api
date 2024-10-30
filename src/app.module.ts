import { Module } from '@nestjs/common';
import { CustomerModule } from './modules/customer.module';
import { ItemModule } from './modules/item.module';
import { SalesOrderModule } from './modules/salesOrder.module';

@Module({
  imports: [CustomerModule, ItemModule, SalesOrderModule],
})
export class AppModule {}
