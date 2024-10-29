import { Module } from '@nestjs/common';
import { CustomerModule } from './modules/customer.module';
import { ItemModule } from './modules/item.module';

@Module({
  imports: [CustomerModule, ItemModule],
})
export class AppModule {}
