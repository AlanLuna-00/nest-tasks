import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  username: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class UserUpdateDTO {
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  email: string;
  @IsOptional()
  @IsString()
  username: string;
  @IsOptional()
  @IsString()
  password: string;
}
