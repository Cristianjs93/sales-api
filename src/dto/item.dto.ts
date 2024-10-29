import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class ItemReqDto {
  @ApiProperty({
    description: 'Item name',
    example: 'Laptop',
  })
  @IsString()
  @IsNotEmpty({ message: 'Item name is required' })
  name: string;

  @ApiProperty({
    description: 'Item quantity',
    example: 10,
  })
  @IsInt({ message: 'Item quantity must be an integer' })
  @IsPositive({ message: 'Item quantity must be a positive number' })
  @IsNotEmpty({ message: 'Item quantity is required' })
  qty: number;

  @ApiProperty({
    description: 'Item price',
    example: 1200.0,
  })
  @IsNumber({}, { message: 'Item price must be a number' })
  @IsPositive({ message: 'Item price must be a positive number' })
  @IsNotEmpty({ message: 'Item price is required' })
  price: number;
}

export class ItemUpdDto extends PartialType(ItemReqDto) {}

export class ItemResDto extends PartialType(ItemReqDto) {
  @ApiProperty({
    description: 'Unique identificator for items',
    example: 1,
  })
  @IsInt()
  id: number;
}
