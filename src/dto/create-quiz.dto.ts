import { PartialType } from "@nestjs/mapped-types"
import { IsBoolean, IsNotEmpty, IsOptional, IsString, Length } from "class-validator"

export class createQuizDto
{

    @IsString()
    @Length(3)
    @IsNotEmpty({message: 'quiz must has title'})
    title:string

    @IsString()
    @Length(3,255)
    @IsNotEmpty()
    description:string

    @IsBoolean()
    @IsOptional()
    isActive: boolean
}


export class  updateQuizDto  extends PartialType(createQuizDto) {}