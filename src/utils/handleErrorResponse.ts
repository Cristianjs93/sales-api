import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const errorMessages = {
  P2025: {
    default: 'Resource not found',
    specifics: {
      Customer: 'Customer not found',
      Order: 'Order not found',
      Item: 'Item not found',
    },
  },
  P2002: {
    default: 'Resource already exists',
    specifics: {
      Customer: 'Customer with the requested phone number already exists',
      Item: 'Item with the requested name already exists',
    },
  },
};

const allowedExceptions = [NotFoundException, BadRequestException];

const isAllowedException = (error: Error): boolean => {
  return allowedExceptions.some((exception) => error instanceof exception);
};

export const handleErrorResponse = (error: Error, defaultMessage: string) => {
  if (error instanceof PrismaClientKnownRequestError) {
    const errorDetail = errorMessages[error.code];

    if (errorDetail) {
      const specificMessage = Object.keys(errorDetail.specifics).find((key) =>
        error.message.includes(key),
      );

      if (specificMessage) {
        throw error.code === 'P2025'
          ? new NotFoundException(errorDetail.specifics[specificMessage])
          : new BadRequestException(errorDetail.specifics[specificMessage]);
      }

      throw new BadRequestException(errorDetail.default);
    }
  }

  if (isAllowedException(error)) {
    throw error;
  }

  throw new InternalServerErrorException(defaultMessage);
};
