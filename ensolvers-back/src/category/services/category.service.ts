import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { CategoryDTO } from '../dto/category.dto';
import { ErrorManager } from 'utils/error.manager';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  public async createCategory(category: CategoryDTO): Promise<CategoryEntity> {
    try {
      const newCategory = await this.categoryRepository.save(category);
      return newCategory;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findCategories(): Promise<CategoryEntity[]> {
    try {
      const categories = await this.categoryRepository.find();
      if (categories.length === 0) {
        throw new ErrorManager({
          type: 'NO_CONTENT',
          message: 'No categories found',
        });
      }
      return categories;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateCategory(
    id: string,
    category: CategoryDTO,
  ): Promise<UpdateResult> {
    try {
      const newCategory: UpdateResult = await this.categoryRepository.update(
        id,
        category,
      );
      if (newCategory.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No category found',
        });
      }
      return newCategory;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async deleteCategory(id: string): Promise<DeleteResult | undefined> {
    try {
      const newCategory: DeleteResult = await this.categoryRepository.delete(
        id,
      );
      if (newCategory.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No category found',
        });
      }
      return newCategory;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
