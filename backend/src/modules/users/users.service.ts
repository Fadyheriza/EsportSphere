import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = new this.userModel({ 
      username: createUserDto.username, 
      password: hashedPassword 
    });
    return user.save();
  }

  async findOne(username: string): Promise<UserDocument | undefined> {
    return this.userModel.findOne({ username }).exec();
  }

  async update(userId: string, updateUserDto: UpdateUserDto): Promise<UserDocument> {
    const updatedUserDto = { ...updateUserDto }; // Kopieren des DTO
    if (updatedUserDto.password) {
      updatedUserDto.password = await bcrypt.hash(updatedUserDto.password, 10);
    }
    return this.userModel.findByIdAndUpdate(userId, updatedUserDto, { new: true }).exec();
  }

  async delete(userId: string): Promise<void> {
    await this.userModel.findByIdAndDelete(userId).exec();
  }
}
