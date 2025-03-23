import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    DeleteDateColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
  } from 'typeorm';
  import { User } from '../../user/entities/user.entity';
  
  @Entity()
  export class Area {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    name: string;
  
    @Column({ nullable: true })
    description: string;
  
    @ManyToMany(() => User, (user) => user.areas)
    responsables: User[];
  
    @CreateDateColumn() // Corrigido: era UpdateDateColumn
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  
    @DeleteDateColumn()
    deleted_at: Date;
  
    @Column()
    active: boolean;
  }