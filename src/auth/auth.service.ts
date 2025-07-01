import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { UserService } from 'src/services/user.service';
     import  * as bcrypt   from  'bcrypt'
import { JwtService } from '@nestjs/jwt';
    

@Injectable()
export class AuthService { 
    constructor(private readonly userService: UserService, 
         private jwtService:JwtService
    ) {}

    async validateUser(email:string, password:string)
    {
         const  user =  await this.userService.getUserByEmail(email)
         if(!user) throw new  UnprocessableEntityException('user is not found!'); 
           const isMatch =  await bcrypt.compare(password, user.password)
         if(!isMatch)
            throw new UnprocessableEntityException('wrong password!');
         delete user.password
       return user

    }
    
     async login(user: any)
     {
      const payload =  { sub: user.id,  email: user.email }
      return {
           access_token: await this.jwtService.sign(payload),
         refresh_token: await this.jwtService.sign(payload,
          { secret: process.env.REFRESH_JWT_SECRET,  expiresIn: process.env.REFRESH_JWT_EXP_IN   }
     ),

      }

     }


     async   refreshToken(user: any)
     {
      const payload =  {  sub: user.id,  email: user.email }
      return {
           access_token: await this.jwtService.sign(payload)
      }

     }



}
