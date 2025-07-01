import { IsArray, IsInt, IsNotEmpty, IsString } from "class-validator";

export class createQuestionDto
{
    @IsString()
    @IsNotEmpty()
    question: string

    @IsNotEmpty()
    // @IsInt()
    quizId : number

    @IsNotEmpty()
    @IsArray()
     categoryIds : number[]
}