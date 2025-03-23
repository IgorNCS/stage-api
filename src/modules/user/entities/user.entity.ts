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
import { Process } from '../../process/entities/process.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
    name: 'user_areas',
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

  @ManyToMany(() => Process, (process) => process.responsible_people)
  @JoinTable({
    name: 'user_process',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'process_id',
      referencedColumnName: 'id',
    },
  })
  processes: Process[];

}
