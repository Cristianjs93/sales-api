import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Item } from '@prisma/client';
import { ItemReqDto, ItemResDto, ItemUpdDto } from 'src/dto/item.dto';
import { ItemService } from 'src/services/item.service';

@Controller('items')
@ApiTags('Items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all items',
  })
  @ApiOkResponse({
    description: 'Items listed successfully',
    type: [ItemResDto],
  })
  async findItems(): Promise<Item[]> {
    try {
      const response = await this.itemService.findItems();
      return response;
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a single item by Id',
  })
  @ApiOkResponse({
    description: 'Item found successfully',
    type: [ItemResDto],
  })
  async findItemById(@Param('id') id: string): Promise<Item> {
    try {
      const response = await this.itemService.findItemById(Number(id));
      return response;
    } catch (error) {
      throw error;
    }
  }

  @Post()
  @ApiOperation({
    summary: 'Creates a new item',
  })
  @ApiCreatedResponse({
    description: 'Item created successfully',
    type: [ItemResDto],
  })
  async createItem(@Body() body: ItemReqDto) {
    try {
      const response = await this.itemService.createItem(body);
      return response;
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Updates a item',
  })
  @ApiOkResponse({
    description: 'Item updated successfully',
    example: 'Item updated successfully',
  })
  async updateItem(@Param('id') id: string, @Body() body: ItemUpdDto) {
    try {
      const response = await this.itemService.updateItem(Number(id), body);
      return response;
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletes a item',
  })
  @ApiOkResponse({
    description: 'Item deleted successfully',
    example: 'Item deleted successfully',
  })
  async deleteItem(@Param('id') id: string) {
    try {
      const response = await this.itemService.deleteItem(Number(id));
      return response;
    } catch (error) {
      throw error;
    }
  }
}
