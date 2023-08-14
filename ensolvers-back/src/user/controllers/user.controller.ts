import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserDTO, UserUpdateDTO } from '../dto/user.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  public async registerUser(@Body() user: UserDTO): Promise<UserDTO> {
    const newUser: UserDTO = await this.userService.createUser(user);
    return newUser;
  }

  @Post('login')
  public async loginUser(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<UserDTO | any> {
    const user: UserDTO = await this.userService.loginUser(email, password);
    return {
      access: true,
      user,
    };
  }

  @Get()
  public async getUsers(): Promise<UserDTO[]> {
    const users: UserDTO[] = await this.userService.findUsers();
    return users;
  }

  @Get(':id')
  public async getUserById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<UserDTO> {
    const user: UserDTO = await this.userService.findUserById(id);
    return user;
  }

  @Put(':id')
  public async updateUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UserUpdateDTO,
  ): Promise<UpdateResult> {
    return await this.userService.updateUser(id, body);
  }

  @Delete(':id')
  public async deleteUser(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<DeleteResult | undefined> {
    return await this.userService.deleteUser(id);
  }
}
