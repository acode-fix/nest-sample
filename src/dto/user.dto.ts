//import { PartialType } from "@nestjs/mapped-types"
import { REGEX, MESSAGES } from "app.utils"
import { IsBoolean, IsNotEmpty, IsOptional, IsEmail, IsString, Length, Matches, Validate } from "class-validator"
import { IsUnique } from "src/validators/is-unique.validator"
import { User } from "src/entities/user.entity"
import { PasswordMatch} from "src/validators/match-password.validator"


export class  userDto
{

    @IsString()
    @Length(3)
    @IsNotEmpty({message:  MESSAGES.USERNAME_MESSAGE})
    name:string

    @IsString()
    @Length(8,25)
    @IsNotEmpty()
    @Matches(REGEX.PASSWORD_RULE,{ message : MESSAGES.PASSWORD_RULE_MESSSAGE})
    password:string

    @IsString()
    @Length(8,25)
    @IsNotEmpty()
    @Matches(REGEX.PASSWORD_RULE,{ message : MESSAGES.PASSWORD_RULE_MESSSAGE})
    @Validate(PasswordMatch, ['password'], {
        message: 'Password confirmation does not match password',
      })
    password_confirm:string

    @IsString()
    @Length(3,255)
    @IsEmail()
    @IsNotEmpty()
   @Validate(IsUnique, [User, "email"])
    
    email:string

}


//export class  updateQuizDto  extends PartialType(createQuizDto) {}