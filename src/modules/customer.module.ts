import { Module } from '@nestjs/common';
import { CustomerController } from 'src/controllers/customer.controller';
import { CustomerService } from 'src/services/customer.service';
import { Prisma } from 'src/database/client';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService, Prisma],
  exports: [CustomerService],
})
export class CustomerModule {}
