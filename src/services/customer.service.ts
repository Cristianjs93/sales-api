import { Injectable } from '@nestjs/common';
import { Customer } from '@prisma/client';
import { Prisma } from 'src/database/client';
import { CustomerReqDto, CustomerUpdDto } from 'src/dto/customer.dto';
import { handleErrorResponse } from 'src/utils/handleErrorResponse';

@Injectable()
export class CustomerService {
  constructor(private prisma: Prisma) {}

  async findCustomers(): Promise<Customer[]> {
    try {
      const customers = await this.prisma.customer.findMany({
        include: {
          salesOrders: { select: { id: true, status: true, total: true } },
        },
      });
      return customers;
    } catch (error) {
      handleErrorResponse(error, 'Error fetching customers');
    }
  }

  async findCustomerById(id: number): Promise<Customer> {
    try {
      const customer = await this.prisma.customer.findUniqueOrThrow({
        where: { id },
        include: {
          salesOrders: { select: { id: true, status: true, total: true } },
        },
      });
      return customer;
    } catch (error) {
      handleErrorResponse(error, 'Error fetching the customer');
    }
  }

  async createCustomer(newCustomer: CustomerReqDto): Promise<Customer> {
    try {
      const customer = await this.prisma.customer.create({
        data: newCustomer,
      });
      return customer;
    } catch (error) {
      handleErrorResponse(error, 'Error creating the customer');
    }
  }

  async updateCustomer(
    id: number,
    updateData: CustomerUpdDto,
  ): Promise<string> {
    try {
      await this.prisma.customer.update({
        where: { id },
        data: updateData,
      });
      return 'Customer updated successfully';
    } catch (error) {
      handleErrorResponse(error, 'Error updating the customer');
    }
  }

  async deleteCustomer(id: number): Promise<string> {
    try {
      await this.prisma.customer.delete({
        where: { id },
      });
      return 'Customer deleted successfully';
    } catch (error) {
      handleErrorResponse(error, 'Error deleting the customer');
    }
  }
}
