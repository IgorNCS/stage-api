// subprocess.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Process } from '../../process/entities/process.entity';
import { ProcessStatus } from '../../process/enums/processStatus';

@Entity()
export class Subprocess {
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

  @ManyToOne(() => Process, process => process.subprocesses)
  process: Process;

  @ManyToOne(() => Subprocess, subprocess => subprocess.subprocesses)
  parent_subprocess: Subprocess;

  @OneToMany(() => Subprocess, subprocess => subprocess.parent_subprocess)
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