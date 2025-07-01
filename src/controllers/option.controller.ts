import { Controller, Get, Body, Post } from '@nestjs/common';
// import { QuizService } from '../services/quiz.service';
//import { QuestionService } from 'src/services/question.service';
import { createOptionDto } from 'src/dto/create-option.dto';
import { OptionService } from 'src/services/option.service';
import { Option } from 'src/entities/option.entity';

@Controller('question/option')
export class OptionController {
    constructor(
      private readonly optionservice:OptionService
        ){}

    @Post('/create')
      createOption( @Body()  optiondata : createOptionDto)
      {
         return this.optionservice.createOption(optiondata)

      } 
}
