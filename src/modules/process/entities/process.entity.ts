// process.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Area } from '../../area/entities/area.entity';
import { Subprocess } from '../../subprocess/entities/subprocess.entity';
import { ProcessStatus } from '../enums/processStatus';

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

  @Column({ type: 'text', array: true, nullable: true })
  responsible_people: string[];

  @Column({ type: 'text', array: true, nullable: true })
  associated_documentation: string[];

  @ManyToOne(() => Area, area => area.processes)
  area: Area;

  @OneToMany(() => Subprocess, subprocess => subprocess.process)
  subprocesses: Subprocess[];

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