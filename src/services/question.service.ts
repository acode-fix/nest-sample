import { QuizService } from '../services/quiz.service';
import {  CategoryService } from '../services/category.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from '../entities/question.entity';
import { createQuestionDto } from '../dto/create-question.dto';
import { Repository } from 'typeorm';
//import { Quiz } from 'src/quiz/quiz.entity';

@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(Question) private readonly questionRepo: Repository <Question>,
        private readonly quizservice:QuizService,
      private readonly  categoryservice:CategoryService

){}

     async createQuestion(questionData: createQuestionDto, qxn_img:string): Promise<Question>
     {

        let quiz, categories;
         try
         {
          quiz = await this.quizservice.getQuiz(questionData.quizId)
          categories = await this.categoryservice.findCategoriesByIDs(questionData.categoryIds)
      
         }
        catch (error) {
            // Handle the error if the quiz is not found
            throw new Error(`Failed to create question: ${error.message}`);
          }
        const newQuestion =  await this.questionRepo.create({ ...questionData, qxn_img:qxn_img, quiz, categories});
        return  await this.questionRepo.save(newQuestion)
     }


     async  getQuestionById(id:number): Promise<Question>
     {
      const questn = await this.questionRepo.findOne(
        {
            where:{id},
            relations:['options']
    })

    if (!questn) {
      throw new Error('Question is not found');
    }

    return  await  questn
     }

}
