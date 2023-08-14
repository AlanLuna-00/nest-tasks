import { Column, Entity, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { INotes } from '../../interfaces/notes.interface';
import { UserEntity } from '../../user/entities/user.entity';
import { CategoryEntity } from '../../category/entities/category.entity';
import { BaseEntity } from '../../config/base.entity';

@Entity({ name: 'notes' })
export class NotesEntity extends BaseEntity implements INotes {
  @Column()
  title: string;
  @Column()
  content: string;
  @Column({
    default: false,
  })
  archived: boolean;
  @Column()
  userId: number;

  @ManyToMany(() => CategoryEntity, (category) => category.notes)
  @JoinTable()
  categories: Array<CategoryEntity>;

  @ManyToOne(() => UserEntity, (user) => user.notes)
  user: UserEntity;
}
