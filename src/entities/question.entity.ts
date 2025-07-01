import { Quiz } from 'src/entities/quiz.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,OneToMany, ManyToMany } from 'typeorm';
import { Option } from './option.entity';
import { Category } from './category.entity';


@Entity('questions')
export class Question {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({
      type: 'varchar',
      nullable:false,
      default: null,
    })
    question: string;

    @Column({
      type: 'varchar',
      nullable:true,
      default: null,
    })
     qxn_img: string;

    @ManyToOne(() =>  Quiz, (quiz) => quiz.questions)
    quiz: Quiz
    
    @OneToMany(() => Option, (option) => option.question)
    options: Option[]

     @ManyToMany(() =>  Category, (category) => category.questions)
     categories: Category[]
    

}