import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { NotesService } from '../services/notes.service';
import { NotesEntity } from '../entities/notes.entity';
import { NotesDTO, NotesUpdateDTO } from '../dto/notes.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  public async getNotes(): Promise<NotesEntity[]> {
    const notes = await this.notesService.findNotes();
    return notes;
  }

  @Get('user/:userId')
  public async getNotesByUserId(
    @Param('userId', new ParseUUIDPipe()) userId: string,
    @Query('filter') filter: string,
  ): Promise<NotesEntity[]> {
    const notes = await this.notesService.findNotesByUserId(userId, filter);
    return notes;
  }

  @Get(':id')
  public async getNotesById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<NotesEntity> {
    const notes = await this.notesService.findNotesById(id);
    return notes;
  }

  @Post(':id')
  public async createNotes(
    @Body() note: NotesDTO,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<NotesEntity> {
    const newNotes: NotesEntity = await this.notesService.createNotes(note, id);
    return newNotes;
  }

  @Put('add-cat/:id')
  async assignCategoriesToNote(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body('categoriesIds') categoriesIds: string[],
  ): Promise<NotesEntity> {
    console.log('categoriesIds', categoriesIds);
    return this.notesService.assignCategoriesToNote(id, categoriesIds);
  }

  @Put(':id')
  public async updateNotes(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() note: NotesUpdateDTO,
  ): Promise<UpdateResult> {
    const newNotes: UpdateResult = await this.notesService.updateNotes(
      id,
      note,
    );
    return newNotes;
  }

  @Delete(':id')
  public async deleteNotes(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<DeleteResult | undefined> {
    return await this.notesService.deleteNotes(id);
  }
}
