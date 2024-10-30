import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Param,
  Body,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Customer } from '@prisma/client';
import {
  CustomerReqDto,
  CustomerResDto,
  CustomerUpdDto,
} from 'src/dto/customer.dto';
import { CustomerService } from 'src/services/customer.service';

@Controller('customers')
@ApiTags('Customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all customers',
  })
  @ApiOkResponse({
    description: 'Customers listed successfully',
    type: [CustomerResDto],
  })
  async findCustomers(): Promise<Customer[]> {
    try {
      const response = await this.customerService.findCustomers();
      return response;
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a single customer by Id',
  })
  @ApiOkResponse({
    description: 'Customer found successfully',
    type: CustomerResDto,
  })
  async findCustomerById(@Param('id') id: string): Promise<Customer> {
    try {
      const response = await this.customerService.findCustomerById(Number(id));
      return response;
    } catch (error) {
      throw error;
    }
  }

  @Post()
  @ApiOperation({
    summary: 'Creates a new customer',
  })
  @ApiCreatedResponse({
    description: 'Customer created successfully',
    type: CustomerResDto,
  })
  async createCustomer(@Body() body: CustomerReqDto) {
    try {
      const response = await this.customerService.createCustomer(body);
      return response;
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Updates a customer',
  })
  @ApiOkResponse({
    description: 'Customer updated successfully',
    example: 'Customer updated successfully',
  })
  async updateCustomer(@Param('id') id: string, @Body() body: CustomerUpdDto) {
    try {
      const response = await this.customerService.updateCustomer(
        Number(id),
        body,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletes a customer',
  })
  @ApiOkResponse({
    description: 'Customer deleted successfully',
    example: 'Customer deleted successfully',
  })
  async deleteCustomer(@Param('id') id: string) {
    try {
      const response = await this.customerService.deleteCustomer(Number(id));
      return response;
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id/restore')
  @ApiOperation({
    summary: 'Restores a customer',
  })
  @ApiOkResponse({
    description: 'Customer restored successfully',
    example: 'Customer restored successfully',
  })
  async restoreCustomer(@Param('id') id: string) {
    try {
      const response = await this.customerService.restoreCustomer(Number(id));
      return response;
    } catch (error) {
      throw error;
    }
  }
}
