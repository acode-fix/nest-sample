import { Entity,Column,PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm"
import { Question } from "./question.entity"


@Entity('categories')

export class  Category {

    @PrimaryGeneratedColumn()
    id:number


    @Column()
    name: string

    @ManyToMany(() => Question, (question) => question.categories)
    @JoinTable({name: "category_questions"})
    questions: Question[]
    
}