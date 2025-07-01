import { Module } from '@nestjs/common';
import { QuestionController } from '../controllers/question.controller';
import { QuestionService } from '../services/question.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from '../entities/question.entity';
//import { Quiz } from 'src/quiz/quiz.entity';
//import { QuizService } from 'src/quiz/quiz.service';
import { QuizModule } from 'src/modules/quiz.module';
import { CategoryModule } from './category.module';
import { CaslModule } from 'src/casl/casl.module';

 

@Module({
  imports: [TypeOrmModule.forFeature([Question]), QuizModule, CategoryModule, CaslModule],
  controllers: [QuestionController],
  providers: [QuestionService],
  exports: [QuestionService]
})
export class QuestionModule {}
