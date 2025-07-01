import { Entity,Column,PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, CreateDateColumn,UpdateDateColumn } from "typeorm"
 import  * as bcrypt   from  'bcrypt'
import { User } from "./user.entity";
import { Permission } from "./permission.entity";
 

@Entity('roles')
export class Role
{
        @PrimaryGeneratedColumn()
        id: number;
      
        @Column()
        name: string;
      
        @ManyToMany(() => Permission, { eager: true })
        @JoinTable({ name:'role_permissions'})
        permissions: Permission[];
      
        @OneToMany(() => User, (user) => user.role)
        users: User[];
         


    
}