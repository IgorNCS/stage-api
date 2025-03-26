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
import { User } from '../../user/entities/user.entity';
import { Process } from '../../process/entities/process.entity';
import { Documentation } from '../../documentation/entities/documentation.entity';

@Entity()
export class Area {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  url_image: string;

  @ManyToMany(() => User, (user) => user.areas, {
    cascade: true,
  })
  @JoinTable({
    name: 'area_users_responsables', 
    joinColumn: {
      name: 'area_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  responsables: User[]; 

  @ManyToMany(() => User, (user) => user.employer_area, {
    cascade: true,
  })
  @JoinTable({
    name: 'area_users_employers',  
    joinColumn: {
      name: 'area_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  employers: User[]; 

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @Column()
  active: boolean;

  @OneToMany(() => Process, (process) => process.area)
  processes: Process[];


  @ManyToMany(() => Documentation, (documentation) => documentation.areas)
  @JoinTable({
    name: 'area_documentations',
    joinColumn: {
      name: 'area_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'documentation_id',
      referencedColumnName: 'id',
    },
  })
  documentations: Documentation[];

}
