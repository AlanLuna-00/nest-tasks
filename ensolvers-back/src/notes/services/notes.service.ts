import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { NotesEntity } from '../entities/notes.entity';
import { NotesDTO, NotesUpdateDTO } from '../dto/notes.dto';
import { ErrorManager } from 'utils/error.manager';
import { UserEntity } from '../../user/entities/user.entity';
import { CategoryEntity } from 'src/category/entities/category.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(NotesEntity)
    private readonly notesRepository: Repository<NotesEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  public async assignCategoriesToNote(
    noteId: string,
    categoriesIds: string[],
  ): Promise<NotesEntity> {
    console.log(categoriesIds);
    const note = await this.notesRepository
      .createQueryBuilder('notes')
      .where({ id: noteId })
      .getOne();
    console.log(note);
    if (!note) {
      throw new ErrorManager({
        type: 'BAD_REQUEST',
        message: 'No note found',
      });
    }

    const categories = await this.categoryRepository
      .createQueryBuilder('category')
      .whereInIds(categoriesIds)
      .getMany();

    if (categories.length !== categoriesIds.length) {
      throw new ErrorManager({
        type: 'BAD_REQUEST',
        message: 'One or more categories not found',
      });
    }

    note.categories = categories;
    console.log(note);
    return this.notesRepository.save(note);
  }

  public async findNotesByUserId(
    userId: string,
    filter: string,
  ): Promise<NotesEntity[]> {
    try {
      let query = this.notesRepository
        .createQueryBuilder('notes')
        .leftJoinAndSelect('notes.categories', 'categories')
        .where({ userId });

      if (filter) {
        query = query.andWhere('categories.name = :categoryName', {
          categoryName: filter,
        });
      }

      const notes = await query.getMany();
      if (notes.length === 0) {
        throw new ErrorManager({
          type: 'NO_CONTENT',
          message: 'No notes found',
        });
      }
      return notes;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async createNotes(
    note: NotesDTO,
    userId: string,
  ): Promise<NotesEntity> {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .where({ id: userId })
        .getOne();
      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No user found',
        });
      }
      const newNote = await this.notesRepository.save({
        ...note,
        user,
      });
      return newNote;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findNotes(): Promise<NotesEntity[]> {
    try {
      const notes = await this.notesRepository.find({
        relations: ['categories'],
      });
      if (notes.length === 0) {
        throw new ErrorManager({
          type: 'NO_CONTENT',
          message: 'No notes found',
        });
      }
      return notes;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findNotesById(id: string): Promise<NotesEntity> {
    try {
      const note = await this.notesRepository
        .createQueryBuilder('notes')
        .where({ id })
        .getOne();
      if (!note) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No notes found',
        });
      }
      return note;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateNotes(
    id: string,
    notes: NotesUpdateDTO,
  ): Promise<UpdateResult> {
    try {
      const newNotes: UpdateResult = await this.notesRepository.update(
        id,
        notes,
      );
      if (newNotes.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No notes found',
        });
      }
      return newNotes;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async deleteNotes(id: string): Promise<DeleteResult | undefined> {
    try {
      const newNotes: DeleteResult = await this.notesRepository.delete(id);
      if (newNotes.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No note found',
        });
      }
      return newNotes;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
