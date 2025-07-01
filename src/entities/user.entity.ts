import { Entity,Column,PrimaryGeneratedColumn, BeforeInsert, ManyToOne, CreateDateColumn,UpdateDateColumn } from "typeorm"
 import  * as bcrypt   from  'bcrypt'
import { Role } from "./role.entity";
  
@Entity('users')
export class User
{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({type: 'varchar', nullable:false })
    name : string;

    @Column({type: 'varchar', nullable:false, unique:true })
     email : string;

    //  @Exclude() 
    @Column({
      type: 'varchar',
      nullable: false,
      select: false
    })
    password: string;

    
    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updateAt: Date;

    // @Column({ insert:true, default: })
    // createdAt: Date;
    // @Column({update:true})
    // updatedAt: Date;

    @ManyToOne(() => Role, (role) => role.users)
    role: Role;
  
    @BeforeInsert()
  async  setPassword(password : string) {
     const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(password || this.password,salt)
}
    


    
}