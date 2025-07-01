import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizModule } from './modules/quiz.module';
import { TypeOrmModule } from '@nestjs/typeorm';
 import { ConfigModule } from '@nestjs/config';
// import { dataSourceOptions, DatabaseConfigModule } from 'db/data-source';
import { QuestionModule } from './modules/question.module';
import { OptionModule } from './modules/option.module';
import { config } from 'dotenv';
import { UserModule } from './modules/user.module';
import { IsUnique } from "src/validators/is-unique.validator";
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './modules/category.module';
import { CaslModule } from './casl/casl.module';
import { CaslAbilityGuard } from './casl/casl-ability.guard';
import { APP_GUARD } from '@nestjs/core';
//import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { datasourceoption } from './config/typeorm.config';
  


config();

  //console.log({'db': process.env.DB_HOST})
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
   // config.forRoot({isGlobal:true}),
  //  DatabaseConfigModule,
    QuizModule,
    QuestionModule,
    OptionModule,
    UserModule,
    CategoryModule,
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => dataSourceOptions(),
    // }),
    TypeOrmModule.forRoot(datasourceoption),
    AuthModule,
    CaslModule,
   

  ],
  controllers: [AppController],
  providers: [AppService, IsUnique,  {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },
  {
    provide: APP_GUARD,
    useClass: CaslAbilityGuard,
  },],
  exports:[IsUnique]
})
export class AppModule {}
