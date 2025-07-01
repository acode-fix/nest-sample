import { Question } from "src/entities/question.entity";
import { Entity,Column,PrimaryGeneratedColumn, OneToMany } from "typeorm"

@Entity('quizes')
export class Quiz 
{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({type: 'varchar', nullable:false })
    title: string;

    @Column({
      type: 'text',
      nullable: false,
    })
    description: string;

    @Column({type: 'boolean',nullable: false,default: 1 })
    isActive: boolean;

    @Column({
      type: 'text',
      nullable: true,
    })
     info: string;
    @OneToMany(() => Question, (question) => question.quiz)
    questions: Question[]
    
    


    
}