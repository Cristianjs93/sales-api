import { ApiProperty, PartialType } from '@nestjs/swagger';
import { SalesOrder } from '@prisma/client';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CustomerReqDto {
  @ApiProperty({
    description: 'Customer name',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty({ message: 'Customer name is required' })
  name: string;

  @ApiProperty({
    description: 'Customer phone',
    example: '+1234567890',
  })
  @IsString()
  @IsNotEmpty({ message: 'Customer phone is required' })
  phone: string;

  @ApiProperty({
    description:
      'Primary street address of the customer, including house number and street name',
    example: '123 Main St',
  })
  @IsString()
  @IsNotEmpty({ message: 'Primary street address is required' })
  streetAddress1: string;

  @ApiProperty({
    description:
      'Additional address information for the customer, such as apartment number, suite, or other details that complement the main address',
    example: 'Apt 4B',
  })
  @IsString()
  @IsOptional()
  streetAddress2: string;

  @ApiProperty({
    description:
      'City where the customer resides. Should be the name of the city or locality.',
    example: 'New York',
  })
  @IsString()
  @IsNotEmpty({ message: 'City is required' })
  city: string;

  @ApiProperty({
    description:
      'State or region of the customer’s address, represented by its two-letter postal abbreviation.',
    example: 'NY',
  })
  @IsString()
  @IsNotEmpty({ message: 'State is required' })
  state: string;

  @ApiProperty({
    description:
      'Postal code for the customer’s address, used for mail delivery. Must follow standard postal code format.',
    example: '10001',
  })
  @IsString()
  @IsNotEmpty({ message: 'Zip code is required' })
  zipCode: string;
}

export class CustomerUpdDto extends PartialType(CustomerReqDto) {}

export class CustomerResDto extends CustomerReqDto {
  @ApiProperty({
    description: 'Unique identificator for custumers',
    example: 1,
  })
  @IsInt()
  id: number;

  @ApiProperty({
    description: 'Customer generated orders',
    example: [{ id: 1, status: 'OPEN', total: 1000 }],
  })
  salesOrders?: SalesOrder[];
}
