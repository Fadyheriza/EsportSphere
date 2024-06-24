import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<UserDocument | null> {
    const user = await this.usersService.findOne(createUserDto.username);
    if (user) {
      this.logger.warn(`User ${createUserDto.username} already exists`);
      return null;
    }
    const createdUser = await this.usersService.create(createUserDto);
    this.logger.log(`User ${createUserDto.username} successfully registered`);
    return createdUser;
  }

  async login(loginUserDto: LoginUserDto): Promise<{ access_token: string } | null> {
    const user = await this.usersService.findOne(loginUserDto.username);
    if (user && await bcrypt.compare(loginUserDto.password, user.password)) {
      const payload = { username: user.username, sub: user._id };
      this.logger.log(`User ${loginUserDto.username} successfully logged in`);
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    this.logger.warn(`Invalid credentials for user ${loginUserDto.username}`);
    return null;
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<UserDocument> {
    return this.usersService.update(userId, updateUserDto);
  }

  async deleteUser(userId: string): Promise<{ deleted: boolean }> {
    await this.usersService.delete(userId);
    return { deleted: true };
  }

  async validateUser(username: string, password: string): Promise<UserDocument | null> {
    const user = await this.usersService.findOne(username);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }
}
