import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class NotesDTO {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  content: string;
}

export class NotesUpdateDTO {
  @IsOptional()
  @IsString()
  title: string;
  @IsOptional()
  @IsString()
  content: string;
  @IsOptional()
  @IsBoolean()
  archived: boolean;
}
