import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Area } from '../../area/entities/area.entity';
import { ProcessStatus } from '../enums/processStatus';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Process {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'text', array: true, nullable: true })
  systems_tools: string[];

  @ManyToMany(() => User, (user) => user.processes)
  @JoinTable()
  responsible_people: User[];

  @Column({ type: 'text', array: true, nullable: true })
  associated_documentation: string[];

  @ManyToOne(() => Area, (area) => area.processes)
  area: Area;

  @OneToMany(() => Process, (process) => process.parent_process)
  processes: Process[] | null;

  @ManyToOne(() => Process, (process) => process.processes)
  parent_process: Process | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @Column({ default: true })
  active: boolean;

  @Column({
    type: 'enum',
    enum: ProcessStatus,
    default: ProcessStatus.DRAFT,
  })
  status: ProcessStatus;
}