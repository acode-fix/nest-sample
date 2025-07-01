import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from 'src/entities/option.entity';
import { QuestionService } from './question.service';
import { createOptionDto } from 'src/dto/create-option.dto';
import { Repository } from 'typeorm';

@Injectable()
export class OptionService {
  constructor(@InjectRepository(Option) private readonly optionRepo: Repository<Option>,
         private readonly questionservice:QuestionService
){}


async createOption(optionData:createOptionDto): Promise<Option>
     {

        let question;
         try
         {
             question = await this.questionservice.getQuestionById(optionData.questionId);
         }
        catch (error) {
            throw new Error(`Failed to create option: ${error.message}`);
          }
          
        const newopt =  await this.optionRepo.create({ ...optionData, question})
        return  await this.optionRepo.save(newopt)
     }
   

}
