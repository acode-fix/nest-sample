import { Module } from '@nestjs/common';
import { OptionController } from '../controllers/option.controller';
import { OptionService } from '../services/option.service';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { Quiz } from '../entities/quiz.entity';
import { Option } from 'src/entities/option.entity';
import { QuestionModule } from './question.module';

@Module({
  imports: [TypeOrmModule.forFeature([Option]), QuestionModule],
  controllers: [OptionController],
  providers: [OptionService],
  exports:[]
})
export class OptionModule {}
