import { IsBoolean, IsInt, IsNotEmpty, IsString } from "class-validator";

export class createOptionDto
{
    @IsString()
    @IsNotEmpty()
    text: string

    @IsNotEmpty()
    @IsInt()
    questionId : number

    @IsBoolean()
    @IsNotEmpty()
    isCorrect: boolean
}