import { Injectable, HttpStatus, HttpException  } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { userDto } from 'src/dto/user.dto';
 

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly  userRepo: Repository<User>
 )
 {}
   
 

  async getUserByEmail(email: string) : Promise<User>
  {
          return await this.userRepo
           .createQueryBuilder('user')
           .where('user.email = :email', { email })
           .addSelect('user.password') 
           .getOne();
       //return await this.userRepo.findOne({where:{email:email}});
  }


  async getUserProfile(id: number) : Promise<User>
  {     //  console.log(id)
       return await this.userRepo.findOne({ where:{id:id}});
  }


  async findByIdWithRoleAndPermissions(userId: number) {
    return this.userRepo.findOne({
      where: { id: userId },
      relations : { role: {
        permissions: true,
      }, }
      //relations: ['role', 'role.permissions'],
    });
  }
    async  registerUser( userData:userDto): Promise<User>
     {
        
          const  user = new User();
           user.name = userData.name;
           user.email = userData.email;
           user.password = userData.password;
             // return user
             // user.save();

           try {
           
          const  myuser = await this.userRepo.save(user);
           //console.log( myuser)
           delete myuser.password;
           return myuser;
        
        } catch (error) {
         throw new HttpException(
            {
              statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
              message: 'User registration failed',
              error: error.message,
            },
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
             //throw new Error("Error while saving user:");
        }

    
     }


}
