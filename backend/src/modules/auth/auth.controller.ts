import { Controller, Post, Body, HttpException, HttpStatus, Get, Patch, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.register(createUserDto);
    if (!user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const token = await this.authService.login(loginUserDto);
    if (!token) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return token;
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Req() req) {
    return req.user;
  }

  @Patch('update')
  @UseGuards(AuthGuard('jwt'))
  async updateUser(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.updateUser(req.user.userId, updateUserDto);
  }

  @Delete('delete')
  @UseGuards(AuthGuard('jwt'))
  async deleteUser(@Req() req) {
    return this.authService.deleteUser(req.user.userId);
  }
}
