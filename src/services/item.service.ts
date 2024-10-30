import { BadRequestException, Injectable } from '@nestjs/common';
import { Item } from '@prisma/client';
import { Prisma } from 'src/database/client';
import { ItemReqDto, ItemUpdDto } from 'src/dto/item.dto';
import { OrderItem } from 'src/dto/salesOrder.dto';
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
      if (item.isDeleted) {
        throw new BadRequestException(`The item ${item.name} is not available`);
      }
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
      await this.prisma.item.update({
        where: { id },
        data: { isDeleted: true },
      });
      return 'Item deleted successfully';
    } catch (error) {
      handleErrorResponse(error, 'Error deleting the item');
    }
  }

  async restoreItem(id: number): Promise<string> {
    try {
      await this.prisma.item.update({
        where: { id },
        data: { isDeleted: false },
      });
      return 'Item restored successfully';
    } catch (error) {
      handleErrorResponse(error, 'Error restoring the item');
    }
  }

  async validateAndGetItem(
    itemDto: OrderItem,
  ): Promise<{ item: Item; remainingStock: number; subtotal: number }> {
    const item = await this.findItemById(itemDto.itemId);

    const remainingStock = item.qty - itemDto.quantity;
    if (remainingStock < 0) {
      throw new BadRequestException(`Not enough stock for item ${item.name}`);
    }
    const minimumAcceptedPrice = Number(item.price) * 0.9;
    if (itemDto.price < minimumAcceptedPrice) {
      throw new BadRequestException(
        `Price of ${item.name} is below of allowed minimum`,
      );
    }

    const subtotal =
      itemDto.quantity * itemDto.price * (1 - itemDto.discount / 100);
    return { item, remainingStock, subtotal };
  }

  async updateItemStock(itemId: number, qty: number): Promise<void> {
    try {
      await this.prisma.item.update({
        where: { id: itemId },
        data: { qty },
      });
    } catch (error) {
      handleErrorResponse(error, 'Error updating the item');
    }
  }
}
