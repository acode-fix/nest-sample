import { Entity,Column,PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, CreateDateColumn,UpdateDateColumn } from "typeorm"

import { User } from "./user.entity";
 

@Entity('permissions')
export class Permission
{
        @PrimaryGeneratedColumn()
        id: number;
      
        @Column()
        action: string; // e.g. 'read', 'create', 'update', 'delete'
      
        @Column()
        subject: string; // e.g. 'User', 'Post'

    
}