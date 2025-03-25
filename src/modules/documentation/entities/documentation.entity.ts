import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { Area } from '../../area/entities/area.entity';
import { Process } from '../../process/entities/process.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Documentation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  documentText: string;

  @Column('text', { array: true, nullable: true }) // Ajuste para array de strings
  tools: string[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @Column({ default: true })
  active: boolean;

  @ManyToOne(() => User, (user) => user.documentations)
  user: User;


  @ManyToMany(() => Area, (area) => area.documentations)
  areas: Area[];

  @ManyToMany(() => Process, (process) => process.documentations)
  @JoinTable({
    name: 'process_documentations',
    joinColumn: {
      name: 'documentation_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'process_id',
      referencedColumnName: 'id',
    },
  })
  processes: Process[];
}
