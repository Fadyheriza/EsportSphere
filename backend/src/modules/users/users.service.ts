import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) { }

    async findOne(username: string): Promise<UserDocument | undefined> {
        return this.userModel.findOne({ username }).exec();
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const createdUser = new this.userModel({
            username: createUserDto.username,
            password: hashedPassword
        });
        return createdUser.save();
    }

    async update(id: string, updateUserDto: CreateUserDto): Promise<User> {
        const updateData: Partial<User> = {};
        if (updateUserDto.username) {
            updateData.username = updateUserDto.username;
        }
        if (updateUserDto.password) {
            updateData.password = await bcrypt.hash(updateUserDto.password, 10);
        }
        return this.userModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    }

    async remove(id: string): Promise<void> {
        await this.userModel.findByIdAndDelete(id).exec();
    }
}
