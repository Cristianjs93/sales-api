import { Module } from '@nestjs/common';
import { ItemController } from 'src/controllers/item.controller';
import { ItemService } from 'src/services/item.service';
import { Prisma } from 'src/database/client';

@Module({
  controllers: [ItemController],
  providers: [ItemService, Prisma],
})
export class ItemModule {}
