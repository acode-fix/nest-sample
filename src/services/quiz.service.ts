import { Injectable } from '@nestjs/common';
import { Quiz } from '../entities/quiz.entity';
import { Repository } from 'typeorm';
import { createQuizDto, updateQuizDto } from '../dto/create-quiz.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class QuizService {
    constructor(@InjectRepository(Quiz) private readonly  quizRepo: Repository<Quiz>
 ){}
   
   
    async getAllQuiz() : Promise<Quiz[]>
    {
         
        //return  await this.quizRepo.find();
       return  await this.quizRepo
                      .createQueryBuilder('q')
                      .innerJoinAndSelect('q.questions', 'qt')
                      .innerJoinAndSelect('qt.options', 'op')
                      .getMany()



    }

    async createQuiz(quiz: createQuizDto): Promise<Quiz>
     {
        const newQuiz = this.quizRepo.create(quiz);
        // Save the new quiz to the database
        return await this.quizRepo.save(newQuiz);
    
     }



     async updateQuiz(quizData: updateQuizDto, id:number): Promise<Quiz>
     {
      try {
         const UpdateResult = await this.quizRepo.update(id, quizData);
     
         if (!UpdateResult) {
           throw new Error(`Quiz with id ${id} not found`);
         }
     
         return  await this.quizRepo.findOne({where:{id}});
       } catch (error) {
         throw new Error(`Error updating quiz: ${error.message}`);
       }
    
     }


     async deleteQuiz(id: number): Promise<void>
     {
       await this.quizRepo.delete(id);
     }





     async  getQuiz(id: number): Promise<Quiz>
     {
        const quiz = await this.quizRepo.findOne(
            {
                where:{id},
                relations:['questions']
        })

        if (!quiz) {
          throw new Error('Quiz not found');
        }

        return  await quiz
    
     }
}
