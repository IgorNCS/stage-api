import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Role } from '../enums/role';
import { Area } from '../../area/entities/area.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  cpf: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  birthday: Date;

  @Column({ default: Role.EMPLOYEER })
  role: Role;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @Column()
  active: boolean;

  @ManyToMany(() => Area, (area) => area.responsables)
  @JoinTable({
    name: 'user_areas', // Nome da tabela de junção
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'area_id',
      referencedColumnName: 'id',
    },
  })
  areas: Area[];
}