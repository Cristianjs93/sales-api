import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus, SalesOrder } from '@prisma/client';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class SalesOrderReqDto {
  @ApiProperty({
    description: 'Customer for the order',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty({ message: 'Customer identification is required' })
  customerId: number;

  @ApiProperty({
    description: 'Items taken in the order',
    example: [{ id: 1, quantity: 2, price: 1000, discount: 5 }],
  })
  @IsNotEmpty({
    message: 'At least one item is required to generate the order',
  })
  items: OrderItem[];
}

export class OrderItem {
  @ApiProperty({
    description: 'Individual item identification taken in the order',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty({ message: 'Item identification is required' })
  itemId: number;

  @ApiProperty({
    description: 'Amount of items taken',
    example: 2,
  })
  @IsInt()
  @IsNotEmpty({ message: 'At least one item is required' })
  quantity: number;

  @ApiProperty({
    description: 'Price of the item',
    example: 1000,
  })
  @IsNumber()
  @IsNotEmpty({ message: 'Item price is required' })
  price: number;

  @ApiProperty({
    description: 'Discount on the item value',
    example: 5,
  })
  @IsNumber()
  @IsOptional()
  discount: number;
}

export class SalesOrderResDto {
  @ApiProperty({
    description: 'Unique identificator for the order',
    example: 1,
  })
  @IsInt()
  id: number;

  @ApiProperty({
    description: 'Customer for the order',
    example: 1,
  })
  @IsInt()
  customerId: number;

  @ApiProperty({
    description: 'Order status',
    example: OrderStatus.OPEN,
  })
  @IsEnum(OrderStatus)
  status: string;

  @ApiProperty({
    description: 'Total order value',
    example: 1900,
  })
  @IsNumber()
  total: number;

  @ApiProperty({
    description: 'Items taken in the order',
    example: [
      {
        id: 1,
        salesOrderId: 1,
        itemId: 1,
        quantity: 2,
        price: 1000,
        discount: 5,
        subtotal: 1900,
      },
    ],
  })
  salesLines: SalesOrder[];

  @ApiProperty({
    description: 'Creation date',
    example: '2024-10-22T14:00:47.857Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update date',
    example: '2024-10-22T14:00:47.857Z',
  })
  updatedAt: Date;
}
