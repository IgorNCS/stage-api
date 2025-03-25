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
import { Documentation } from '../../documentation/entities/documentation.entity';

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
  @JoinTable({
    name: 'process_responsible_people', // Nome da tabela de junção especificado
  })
  responsible_people: User[];

  @ManyToOne(() => Area, (area) => area.processes)
  area: Area;

  @OneToMany(() => Process, (process) => process.parent_process)
  subProcesses: Process[] | null; // Renomeado para subProcesses

  @ManyToOne(() => Process, (process) => process.subProcesses) // Ajustado para subProcesses
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

  @ManyToMany(() => Documentation, (documentation) => documentation.processes)
  documentations: Documentation[];
}
