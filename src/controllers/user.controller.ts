import { Controller, Put, Get, Body, Post, Param, Delete, HttpStatus, HttpCode} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { userDto } from 'src/dto/user.dto';

//import { createQuizDto } from 'src/dto/create-quiz.dto';

@Controller('user')
export class UserController {
    constructor(private readonly  userservice:UserService){}

    @Post('/register')
    @HttpCode(HttpStatus.OK)
     async  registerNewUser(@Body() userData: userDto)
       {
          try {

              const data = await this.userservice.registerUser(userData)
             // console.log(data)
           
            return  {status: 'success',mesaage:'user data saved', data:data, error:null }
          }
           catch(e)
           {
            throw {
              statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
              message: 'User registration failed',
              error: e.message,
            };
            //return { status: 'error',message:e.message, data:null}
           }
         
       }

 


}
