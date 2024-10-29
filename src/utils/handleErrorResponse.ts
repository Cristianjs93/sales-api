import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const handleErrorResponse = (error: Error, defaultMessage: string) => {
  if (error instanceof PrismaClientKnownRequestError) {
    const isCustomerError = error.message.includes('Customer');

    if (error.code === 'P2025') {
      const message = isCustomerError ? 'Customer not found' : 'Item not found';
      throw new NotFoundException(message);
    }

    if (error.code === 'P2002') {
      const message = isCustomerError
        ? 'Customer with the requested phone number already exists'
        : 'Item with the requested name already exists';
      throw new BadRequestException(message);
    }
  }

  throw new InternalServerErrorException(defaultMessage);
};
