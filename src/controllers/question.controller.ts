import { Controller, Post, Body, UseGuards, Request,
  UploadedFile,
  UseInterceptors,
  BadRequestException
 } from '@nestjs/common';
import { QuestionService } from '../services/question.service';
import { createQuestionDto } from '../dto/create-question.dto';
import { CaslAbilityGuard } from 'src/casl/casl-ability.guard';
import { CheckAbilities } from 'src/casl/cast-check-abilities.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('question')
export class QuestionController {

     constructor(private readonly questionservice: QuestionService){}

     @Post('/create')

     //@UseGuards(AuthGuard('jwt'))
     //@UseGuards(CaslAbilityGuard)
      @CheckAbilities({ action: 'create', subject: 'Question' })

      @UseInterceptors(
        FileInterceptor('qxn_img',
          {
            storage:diskStorage(
              {
                 destination: './uploads',
                 filename:(req, qxn_img,cb) => {
                  const uniqueName = `${ Date.now()}${extname(qxn_img.originalname)}`;
                   cb(null, uniqueName)
                 },
              } ),

              limits: {
                fileSize: 100 * 1024, // 500KB
              },
              fileFilter: (req, file, cb) => {
                const allowedTypes = /jpeg|jpg|png/;
                const ext =  extname(file.originalname).toLowerCase();
                const mime = file.mimetype;
        
                if (
                  allowedTypes.test(ext.replace('.', '')) &&
                  allowedTypes.test(mime.split('/')[1])
                ) {
                  cb(null, true);
                } else {
                  cb(  new  BadRequestException (
                      'Only .png, .jpg, and .jpeg files under 500KB are allowed.', ),
                    false,
                  );
                } 
              }    


          })
      )
      async CreateQuestion(@Body() questionData: createQuestionDto, @UploadedFile()  qxn_img: Express.Multer.File,
       @Request() request)
      { 
         //return questionData
        return this.questionservice.createQuestion(questionData,qxn_img?.filename)
      }

}
