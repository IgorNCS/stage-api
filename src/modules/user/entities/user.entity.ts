import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Role } from '../enums/role';
import { Area } from '../../area/entities/area.entity';
import { Process } from '../../process/entities/process.entity';
import { Documentation } from '../../documentation/entities/documentation.entity';

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
  areas: Area[];

  @ManyToMany(() => Area, (area) => area.employers)
  employer_area: Area[];


  @ManyToMany(() => Process, (processes) => processes.responsible_people)
  processes: Process[];

  @OneToMany(() => Documentation, (documentation) => documentation.user)
  documentations: Documentation[];
}
