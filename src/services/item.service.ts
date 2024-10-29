import { Injectable } from '@nestjs/common';
import { Item } from '@prisma/client';
import { Prisma } from 'src/database/client';
import { ItemReqDto, ItemUpdDto } from 'src/dto/item.dto';
import { handleErrorResponse } from 'src/utils/handleErrorResponse';

@Injectable()
export class ItemService {
  constructor(private prisma: Prisma) {}

  async findItems(): Promise<Item[]> {
    try {
      const items = await this.prisma.item.findMany({});
      return items;
    } catch (error) {
      handleErrorResponse(error, 'Error fetching items');
    }
  }

  async findItemById(id: number): Promise<Item> {
    try {
      const item = await this.prisma.item.findUniqueOrThrow({
        where: { id },
      });
      return item;
    } catch (error) {
      handleErrorResponse(error, 'Error fetching items');
    }
  }

  async createItem(newItem: ItemReqDto): Promise<Item> {
    try {
      const item = await this.prisma.item.create({
        data: newItem,
      });
      return item;
    } catch (error) {
      handleErrorResponse(error, 'Error fetching the Item');
    }
  }

  async updateItem(id: number, updateData: ItemUpdDto): Promise<string> {
    try {
      await this.prisma.item.update({
        where: { id },
        data: updateData,
      });
      return 'Item updated successfully';
    } catch (error) {
      handleErrorResponse(error, 'Error updating the item');
    }
  }

  async deleteItem(id: number): Promise<string> {
    try {
      await this.prisma.item.delete({
        where: { id },
      });
      return 'Item deleted successfully';
    } catch (error) {
      handleErrorResponse(error, 'Error deleting the item');
    }
  }
}
