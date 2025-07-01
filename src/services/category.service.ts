import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from 'src/entities/option.entity';
import { QuestionService } from './question.service';
import { Repository,In } from 'typeorm';
import { Category } from 'src/entities/category.entity';
import { CategoryDto } from 'src/dto/category.dto';


@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private readonly  categoryRepo: Repository<Category>,
         //private readonly questionservice:QuestionService
){}


async findCategoriesByIDs(categoryIds: number[]): Promise<Category | any >
 {
     const  category =  this.categoryRepo.findBy({
      id: In(categoryIds),
    });
    return category
 }


async createCategory( categorydata: CategoryDto): Promise<Category>
     {

         try
         {
            const   category =     await this.categoryRepo.create(categorydata)
              let  mycatg =  await this.categoryRepo.save(category);
              return mycatg
         }
        catch (error) {
            throw new  UnprocessableEntityException(`Failed to create Category: ${error.message}`);
          }
          
         
     }
   

}
