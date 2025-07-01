import { Module } from '@nestjs/common';
import { QuizController } from '../controllers/quiz.controller';
import { QuizService } from '../services/quiz.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from '../entities/quiz.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Quiz])],
  controllers: [QuizController],
  providers: [QuizService],
  exports:[QuizService]
})
export class QuizModule {}
