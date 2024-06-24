import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get(':username')
    async findOne(@Param('username') username: string) {
        return this.usersService.findOne(username);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }
}
