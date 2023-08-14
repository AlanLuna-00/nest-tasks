import { Column, Entity, ManyToMany } from 'typeorm';
import { ICategory } from '../../interfaces/category.interface';
import { NotesEntity } from '../../notes/entities/notes.entity';
import { BaseEntity } from '../../config/base.entity';

@Entity({ name: 'category' })
export class CategoryEntity extends BaseEntity implements ICategory {
  @Column()
  name: string;
  @ManyToMany(() => NotesEntity, (notes) => notes.categories)
  notes: Array<NotesEntity>;
}
