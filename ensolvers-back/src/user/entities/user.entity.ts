import { IUser } from '../../interfaces/user.interface';
import { Column, Entity, OneToMany } from 'typeorm';
import { NotesEntity } from '../../notes/entities/notes.entity';
import { BaseEntity } from '../../config/base.entity';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity implements IUser {
  @Column()
  name: string;
  @Column({ unique: true })
  email: string;
  @Column({ unique: true })
  username: string;
  @Column()
  password: string;

  @OneToMany(() => NotesEntity, (notes) => notes.user)
  notes: NotesEntity[];
}
