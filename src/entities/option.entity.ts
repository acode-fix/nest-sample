import { Question } from "src/entities/question.entity";
import { Entity,Column,PrimaryGeneratedColumn, ManyToOne } from "typeorm"

@Entity('options')
export class Option {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({type: 'varchar', nullable:false })
    text: string;



    @Column({type: 'boolean'})
    isCorrect: boolean;


    @ManyToOne(() =>  Question, (question) => question.options )
    question: Question
    
    // @ManyToOne(() =>  Quiz, (quiz) => quiz.questions)
    //     quiz: Quiz


    
}