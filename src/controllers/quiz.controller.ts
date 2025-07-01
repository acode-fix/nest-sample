import { Controller, Put, Get, Body, Post, Param, Delete, Query} from '@nestjs/common';
import { QuizService } from '../services/quiz.service';
import { createQuizDto, updateQuizDto } from 'src/dto/create-quiz.dto';

@Controller('quiz')
export class QuizController {
    constructor(private readonly quizservice:QuizService){}

    @Get('/')
      getAllQuiz()
       {
         return this.quizservice.getAllQuiz()
       }

    @Post('/create')
      createQuiz( @Body() createquizdto : createQuizDto) 
      {
         return this.quizservice.createQuiz(createquizdto)
      } 

      @Put('/:id/update')
        updateQuiz(@Param('id') id: number, @Query("name") name: string, @Query("age") age: number, @Body() updateQuizDto: updateQuizDto) 
        {
          return this.quizservice.updateQuiz(updateQuizDto, id)
        }

        @Delete('/:id')
        deleteQuiz(@Param('id') id: number)
        {
              return this.quizservice.deleteQuiz(id)
        }
}
