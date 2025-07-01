import { Controller, Get, Body, Post } from '@nestjs/common';
import { CategoryDto } from 'src/dto/category.dto';
import { CategoryService } from 'src/services/category.service';

 


@Controller('category')
export class  CategoryController {
    constructor(
      private readonly categoryservice:CategoryService
        ){
          
        }

    
    @Post('/create')
      createCategory( @Body()  categorydata : CategoryDto)
      {
         return this.categoryservice.createCategory(categorydata)

      } 
}
