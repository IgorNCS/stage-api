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
    name: 'process_responsible_people', 
  })
  responsible_people: User[];

  // @ManyToMany(() => Process, (process) => process.documentations)
  // @JoinTable({
  //   name: 'process_documentations',
  //   joinColumn: {
  //     name: 'documentation_id',
  //     referencedColumnName: 'id',
  //   },
  //   inverseJoinColumn: {
  //     name: 'process_id',
  //     referencedColumnName: 'id',
  //   },
  // })
  // processes: Process[];

  // @ManyToMany(() => Documentation, (documentation) => documentation.processes)
  // documentations: Documentation[];

  @ManyToOne(() => Area, (area) => area.processes)
  area: Area;

  @OneToMany(() => Process, (process) => process.parent_process)
  subProcesses: Process[] | null; 

  @ManyToOne(() => Process, (process) => process.subProcesses) 
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
