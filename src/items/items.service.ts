import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Items, ItemsDocument } from './schemas/items.schema';
import { Model, Mongoose } from 'mongoose';

@Injectable()
export class ItemsService {
  constructor(@InjectModel(Items.name) private itemsModule: Model<Mongoose>) {}

  async create(createItemDto: CreateItemDto) {
    //TODO DTO createItemDto --> BODY esto trae la data
    const itemCreated = await this.itemsModule.create(createItemDto);
    return itemCreated;
  }

  async findAll() {
    const allItems = await this.itemsModule.find({});
    return allItems;
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  async remove(id: string) {
    const deletedItems = this.itemsModule.findByIdAndDelete(id);
    return deletedItems;
    // return `This action removes a #${id} item`;
  }
}
