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
import { CategoryService } from '../services/category.service';
import { CategoryEntity } from '../entities/category.entity';
import { CategoryDTO } from '../dto/category.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  public async getCategories(): Promise<CategoryEntity[]> {
    const categories = await this.categoryService.findCategories();
    return categories;
  }

  @Post()
  public async createCategory(
    @Body() category: CategoryDTO,
  ): Promise<CategoryEntity> {
    const newCategory: CategoryEntity =
      await this.categoryService.createCategory(category);
    return newCategory;
  }

  @Put(':id')
  public async updateCategory(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() category: CategoryDTO,
  ): Promise<UpdateResult> {
    const newCategory: UpdateResult = await this.categoryService.updateCategory(
      id,
      category,
    );
    return newCategory;
  }

  @Delete(':id')
  public async deleteCategory(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<DeleteResult | undefined> {
    return await this.categoryService.deleteCategory(id);
  }
}
